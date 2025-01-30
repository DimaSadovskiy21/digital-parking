import { FC, PropsWithChildren } from "react";

// project imports
import "src/styles/index.css";

// store
import { TCarsStore, useCarsStore } from "src/store/carsStore";

const carsSelector = (state: TCarsStore) => state.cars;

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const cars = useCarsStore(carsSelector);

  return (
    <div className="container">
      <header className="header">
        <a className="link" href="/">
          <img className="icon" src="icon.svg" alt="logo" />
          <h1>Digital Parking</h1>
        </a>
        <h1>{cars.length}</h1>
      </header>
      <main className="main">{children}</main>
      <footer className="footer"></footer>
    </div>
  );
};

export default Layout;
