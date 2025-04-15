import React, { useEffect } from 'react';
import { init } from '@/scripts/webgl';

const WebGLComponent = () => {

  useEffect(() => {
    const images = [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
      'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
      'https://images.unsplash.com/photo-1549887534-173f48c8e5b4?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb'
    ];

    const webgl = init(images);


  }, []);
  return (
    <div id="wrap-texture">

      <div id="canvas"></div>



    </div>
  );
};

export default WebGLComponent;