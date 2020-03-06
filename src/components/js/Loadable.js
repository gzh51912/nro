import React, { Component } from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
    loader: () => import('@/components/js/Detail'),
    loading() {
        return <div>正在加载</div>
    },
  });
  
  export default () => <LoadableComponent/>