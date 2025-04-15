import { useEffect } from 'react';
import { init } from '../hooks/webgl';

const WebGLComponent = ({images}) => {

  useEffect(() => {
    const plane = document.querySelector('.plane')
    if(plane) return


    const webgl = init(images);


  }, []);
  return (
    <div id="wrap-texture">

      <div id="canvas"></div>



    </div>
  );
};

export default WebGLComponent;