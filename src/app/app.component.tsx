import VendorPMLogo from "../assets/logo.png";
import { People } from "./modules/people";
import { AxiosProvider } from "./shared/context";

import "./app.css";

export function App() {
  return (
    <AxiosProvider>
      <div className="App">
        <section>
          <People />
        </section>
      </div>
    </AxiosProvider>
  );
}
