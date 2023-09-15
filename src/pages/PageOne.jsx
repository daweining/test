import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { firstTest } from '@/store/testStore/action';
import image1 from '../images/image1.png';

const useStyle = makeStyles(() => ({
  root: {
    width: 300,
    height: 200,
    display: 'flex',
    justifyContent: 'center',
  },
}));

const PageOne = () => {
  const styles = useStyle();
  const canvas = useRef();
  const dispatch = useDispatch();
  const [eyeImg, setEyeImg] = useState('');
  const imageText = useSelector(({ testStore }) => testStore.testValue);

  const deleteStorage = () => {
    localStorage.removeItem('name');
  };

  useEffect(() => {
    dispatch(firstTest());
  }, [dispatch]);

  useEffect(() => {
    /* console.log('test'[0]);
    const map = new Map();
    map.set('test', 1);
    console.log(map.get('test'));
    const testMap = {
      test: 1,
      test2: 3,
    };
    Reflect.deleteProperty(testMap, 'test');
    console.log(Reflect.has(testMap, 'test')); */

    /* const arr = [1, 2, 3];
    delete arr[2];
    console.log(arr);
    console.log(1 in arr); */

    /* const i = 0;
    queueMicrotask(() => {
      console.log('microtask', i);
    });
    queueMicrotask(() => {
      console.log('microtask', 2);
    });
    console.log('test'); */
    /* localStorage.setItem('name', 'Chris');
    const fetch = () => new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 2000);
    });
    fetch().then((res) => {
      console.log(res);
      return 22;
    }).then((res) => {
      console.log(res);
    }); */

    const image = new Image();
    image.crossOrigin = 'anonymous'; // 允许跨域请求
    image.src = 'https://opht-platform-data-test.oss-cn-shanghai.aliyuncs.com/photo%2F297%2F23%2F44d0d8de52a511eebedcae3d8fc8bcd6.jpeg?OSSAccessKeyId=LTAIgZVdUfHeaHiB&Expires=1694765632&Signature=o1OzA%2F7kzqroBQmahe8yLXBMolM%3D';

    // 转换图片为 base64 编码
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      const base64String = canvas.toDataURL(); // 将画布转换为 base64 编码字符串
      setEyeImg(base64String);
    };
  }, []);

  useEffect(() => {
    if (imageText) {
      const context = canvas.current?.getContext('2d');
      console.log(context);
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(300 / 790, 200 / 594);
        const width = 790 * scale;
        const height = 594 * scale;
        canvas.current.width = width || 0;
        canvas.current.height = height;
        context.drawImage(image, 0, 0, width, height);
        context.save();
        context.fillStyle = 'green';
        context.fillRect(20, 20, 50 * scale, 50 * scale);
        context.restore();
        context.fillStyle = '#18ffff';
        context.fillRect(0, 0, 50 * scale, 50 * scale);
        context.restore();
        context.font = '60px STheiti, SimHei';
        context.fillStyle = 'red';
        context.fillText(imageText, 80, 80);
      };
      image.src = image1;
    }
  }, [imageText]);

  return (
    <div>
      <div className={styles.root} onClick={deleteStorage}><canvas ref={canvas}>2</canvas></div>
      <img src={eyeImg} alt="" />
      <Outlet />
    </div>
  );
};

export default PageOne;
