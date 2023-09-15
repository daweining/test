import React, {
  useState,
  useRef,
  useEffect,
  // useMemo,
  // useCallback,
  memo,
} from 'react';
import * as echarts from 'echarts';
// import { useDropzone } from 'react-dropzone'
import Cascader from 'rc-cascader';
// import RcUpload from 'rc-upload'
// import { fabric } from 'fabric'
// import Cropper from 'cropperjs'
// import image1 from '../images/image1.png'
import 'rc-cascader/assets/index.less';
import './index.less';

const Test = () => {
  // const inputRef = useRef()
  const canvasRef = useRef(null);
  // const [inputSrc, setInputSrc] = useState('')
  // const [inputValue, setInputValue] = useState('')
  const [inputV, setInputV] = useState('');
  const [op, setOp] = useState([]);
  const [caV, setCav] = useState([]);
  // const [caOptions, setCaOptions] = useState([])
  // let cropper = {}
  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  //   console.log(acceptedFiles)
  // }, [])
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    document.title = 'ning';
    console.log(canvasRef.current);
    let chart;
    if (chart !== null && chart !== '' && chart !== undefined) {
      chart.dispose();
    }
    chart = echarts.init(canvasRef.current);
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      tooltip: {
        formatter: value => `${value.value}yuan`,
      },
      yAxis: {
        type: 'value',
        data: [0, 50, 100, 150, 200],
        axisLine: {
          show: true,
          symbol: ['none', 'arrow'],
          symbolOffset: [0, 15],
        },
        splitArea: {
          show: false,
          interval: 2,
          areaStyle: {
            color: [1, 20, 5, 0].map((item) => {
              if (item > 10) {
                return 'red';
              }
              return 'blue';
            }),
          },
        },
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line',
          lineStyle: {
            color: '#5470C6',
            width: 4,
            type: 'dashed',
          },
          itemStyle: {
            borderWidth: 0,
            borderColor: '#EE6666',
          },
          // label: {
          //   show: true,
          //   position: 'top',
          //   formatter: params => {
          //     return `${params.value}`
          //   },
          //   backgroundColor: 'red',
          //   lineHeight: 15,
          //   borderColor: 'blue',
          //   borderType: 'solid',
          //   padding: [4, 5],
          //   borderWidth: 1,
          // },
          symbol: value => (value < 130 ? 'circle' : '../images/image1.png'),
          symbolSize: 10,
          markPoint: {
            data: [120, 200, 150, 80, 70, 110, 130].map((item, index) => ({
              xAxis: index,
              yAxis: item,
              value: item,
              symbolSize: 0,
              label: {
                show: item < 130,
                position: 'top',
                distance: 15,
                formatter: params => `${params.value}`,
                tooltip: {},
                backgroundColor: 'red',
                lineHeight: 15,
                borderColor: 'blue',
                borderType: 'solid',
                padding: [4, 5],
                borderWidth: 1,
              },
            })),
            // data:[{
            //   x: 1,
            //   name: 'test',
            //   symbol: 'circle',
            // }],
            // label:{
            //   show: true,
            //   position: ['60%', '80%'],
            //   backgroundColor: 'blue',
            // }
          },
        },
      ],
    };
    chart.setOption(option);
  }, []);

  useEffect(() => {
    setOp([
      {
        label: '山东',
        value: 'sd',
        isLeaf: false,
        loading: true,
      },
      {
        label: '上海',
        value: 'sh',
        isLeaf: false,
      },
    ]);
  }, []);

  const loadMore = label => new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          label: `${label}动态加载1`,
          value: 'dynamic1',
        },
        {
          label: `${label}动态加载2`,
          value: 'dynamic2',
        },
      ]);
    }, 2000);
  });

  useEffect(() => {
    const o = {
      label: '山东',
      value: 'sd',
      isLeaf: false,
    };
    setCav([['sd', 'dynamic1']]);
    loadMore('山东').then((res) => {
      o.loading = false;
      o.children = res.map((i) => {
        const { label, value } = i;
        return {
          label,
          value,
        };
      });
      setOp((v) => {
        const f = v.find(i => o.value !== i.value);
        return [{ ...f }, { ...o }];
      });
    });
  }, []);
  // chart.setOption(option)
  // console.log(inputRef)
  // const cropper = useMemo(()=>{
  //   if(inputRef.current){
  //     return new Cropper(inputRef.current, {
  //       autoCrop: false,
  //       dragMode: 'move',
  //       background: false,
  //       ready:()=>{

  //       }
  //     })
  //   }
  // },[inputRef.current])

  // useEffect(() => {
  //   if (inputRef.current) {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     cropper = new Cropper(inputRef.current, {
  //       // aspectRatio: 16 / 9,
  //       // movable: true,
  //       autoCrop: false,
  //       dragMode: 'move',
  //       background: false,
  //       ready() {
  //         // cropper.rotate(-90)
  //       },
  //       crop(event) {
  //         // console.log(event.detail.x)
  //         // console.log(event.detail.y)
  //         // console.log(event.detail.width)
  //         // console.log(event.detail.height)
  //         // console.log(event.detail.rotate)
  //         // console.log(event.detail.scaleX)
  //         // console.log(event.detail.scaleY)
  //       },
  //     })
  //     console.log(cropper)
  //   }
  // }, [])
  // const image = document.getElementById('image');
  // const cropper = new Cropper(image, {
  //   aspectRatio: 16 / 9,
  //   crop(event) {
  //     console.log(event.detail.x)
  //     console.log(event.detail.y)
  //     console.log(event.detail.width)
  //     console.log(event.detail.height)
  //     console.log(event.detail.rotate)
  //     console.log(event.detail.scaleX)
  //     console.log(event.detail.scaleY)
  //   },
  // })

  // console.log(inputRef?.current?.value)
  // useEffect(()=>{
  //   const canvas = new fabric.Canvas('c')
  //   const circle1 = new fabric.Circle({
  //     radius:65,
  //     fill: 'red',
  //     left: 0,
  //     stroke: 'red',
  //     strokeWidth: 3
  //   })
  //   canvas.add(circle1)
  // })
  const changeCas = (value, selectOptions) => {
    console.log(value, selectOptions);
    setCav(value);
  };

  const loadData = (value) => {
    const targetOption = value[value.length - 1];
    console.log('loadData===============>', value);
    loadMore(targetOption.label).then((res) => {
      targetOption.children = res.map((i) => {
        const { label, value } = i;
        return {
          label,
          value,
        };
      });
      setOp(v => [...v]);
    });
  };

  useEffect(() => {
    console.log(caV, op);
    setInputV(
      caV
        .map((i) => {
          const findV = op.find(item => item.value === i[0]);
          const childV = findV?.children?.find(item => item.value === i[1]);
          return [findV?.label, childV?.label].join('-');
        })
        .join(','),
    );
  }, [caV, op]);

  return (
    <>
      <div
        ref={canvasRef}
        onClick={() => console.log(canvasRef)}
        style={{ width: 500, height: 500 }}
      >
        1
      </div>
      <Cascader
        value={caV}
        options={op}
        loadData={loadData}
        // changeOnSelect
        checkable
        onChange={changeCas}
        showCheckedStrategy="SHOW_CHILD"
        changeOnSelect
        dropdownRender={menus => <>{menus}</>}
      >
        <input className="ca-input" title={inputV} value={inputV} readOnly />
      </Cascader>
      {/* <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div> */}
      {/* <input
        type='file'
        id='input'
        ref={inputRef}
        accept='image/*'
        value={inputValue}
        onDrop={e=>console.log(e)}
        onChange={e => {
          if (e.target.files.length > 0) {
            setInputValue(e.target.value)
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onloadend = ev => {
            //   console.log(ev.target)
              setInputSrc(ev.target.result)
            }
          }else{
            setInputValue('')
          }
        }}
      />
      <img
        style={{ width: 50, height: 50, objectFit: 'contain' }}
        alt=''
        src={inputSrc}
      /> */}
      {/* <div style={{ width: 50, height: 50, background: 'red' }}>
        上传
        <RcUpload
          style={{ width: '100%', height: '100%', display: 'block' }}
          name='upload'
          onStart={e => {
            const reader = new FileReader()
            reader.readAsDataURL(e)
            // console.log(e)
            reader.onloadend = ev => {
              //   console.log(ev.target)
              setInputSrc(ev.target.result)
            }
          }}
          // onSuccess={e => console.log(e)}
          // onProgress={e => console.log(e)}
        ></RcUpload>
      </div> */}
      {/* <div style={{width: 1000,height: 1000}}>
        <img
          ref={inputRef}
          id='image'
          style={{ objectFit: 'contain' }}
          alt=''
          // src={inputSrc}
          src={image1}
        />
      </div>
      <button onClick={()=>cropper.rotate(-90)}></button> */}
      {/* <canvas id="c" width={500} height={500}></canvas> */}
    </>
  );
};

export default memo(Test);
