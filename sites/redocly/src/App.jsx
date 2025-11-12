import React from 'react';
import { RedocStandalone } from 'redoc';

function App() {
  return (
    <RedocStandalone
      specUrl="/openapi.yaml"
      options={{
        nativeScrollbars: true,
        theme: {
          colors: {
            primary: {
              main: '#3b82f6'
            }
          }
        }
      }}
    />
  );
}

export default App;
