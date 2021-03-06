import { Route, Switch } from 'react-router';
import { MainBoard } from '../../pages';

const Content = () => {
  return (
    <div className="flex-grow">
      <div className="container mx-auto px-4 h-full">
        <Switch>
          <Route path='/' exact component={MainBoard} />
        </Switch>
      </div>
    </div>
  );
};

export default Content;
