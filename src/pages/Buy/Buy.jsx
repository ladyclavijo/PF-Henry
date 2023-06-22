import React, { useContext } from 'react';
import ContainerAddress from './Address';
import Payment from './Payment';
import Articles from './Articles';
import NavBar from "../../components/NavBar/NavBar";
import { ThemeContext } from '../../components/ThemeProvider/ThemeProvider';
import "../../Styles/colors.css";


export default function Buy() {

    const { theme } = useContext(ThemeContext);

    const styles = {
        container: {
            backgroundColor: "var(--color-background)",
        },
    };

    return (
        <div className={`bg-slate-300 min-h-screen flex flex-col items-center`} style={styles.container}>
          <NavBar />
      
          <div className={`mt-1 flex flex-row`} style={styles.container}>
            <div className={`w-80 flex flex-col`} style={styles.container}>
              <div style={{ marginTop: '20px' }}>
                <div className={`mb-10`}>
                  <ContainerAddress />
                </div>
                <Payment />
              </div>
            </div>
      
            <div className={`flex-grow ml-9 flex flex-col`} style={styles.container}>
              <div className="flex flex-col justify-center">
                <div className={`Container-3 max-w-lg`} style={styles.container}>
                  <div className="flex-grow">
                    <Articles />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );     
}