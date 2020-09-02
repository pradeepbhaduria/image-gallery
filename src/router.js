import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ImageListThumbnails from './image-list-thumbnails';
import ImageList from './image-list';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/full-size">
          <ImageList />
        </Route>
        <Route path="/">
          <ImageListThumbnails />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
