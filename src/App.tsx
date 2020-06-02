import React, {useRef, useState} from 'react';
import {
    IonAlert,
    IonApp,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import InputControl from './components/InputControls';

const App: React.FC = () => {
    const [calculatedBmi, setCalculatedBmi] = useState<number>();
    const [error, setError] = useState<string>();
    const [calcUnits, setCalcUnits] = useState<'metric' | 'imperial'>('metric');

    const weightInputRef = useRef<HTMLIonInputElement>(null);
    const heightInputRef = useRef<HTMLIonInputElement>(null);

    const calculateBMI = () => {
        const enteredWeight = weightInputRef.current!.value;
        const enteredHeight = heightInputRef.current!.value;

        if (!enteredHeight || !enteredWeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
            setError('Please enter a valid number.')
            return;
        }

        const weightConversionFactor = calcUnits === 'imperial' ? 2.2 : 1
        const heightConversionFactor = calcUnits === 'imperial' ? 3.28 : 1

        const weight = +enteredWeight / weightConversionFactor;
        const height = +enteredHeight / heightConversionFactor

        const bmi = weight / (height * height);

        setCalculatedBmi(bmi);
    };
    const resetInputs = () => {
        weightInputRef.current!.value = '';
        heightInputRef.current!.value = '';
    };
    const clearError = () => {
        setError('');
    };
    const selectCalcUnitHandler = (selectedValue: 'metric' | 'imperial') => {
        setCalcUnits(selectedValue);
    };

    return (
        <React.Fragment>
            <IonAlert isOpen={!!error} message={error} buttons={[{text: 'Okay', handler: clearError}]}/>
            <IonApp>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>BMI Calculator</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">
                                        Your Height ({calcUnits === 'metric' ? 'meters' : 'feet'})
                                    </IonLabel>
                                    <IonInput type="number" ref={heightInputRef}/>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">
                                        Your Weight ({calcUnits === 'metric' ? 'kg' : 'lbs'})
                                    </IonLabel>
                                    <IonInput type="number" ref={weightInputRef}/>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <BmiControls onCalculate={calculateBMI} onReset={resetInputs}/>
                        {calculatedBmi &&
                        <BmiResult result={calculatedBmi}/>
                        }
                    </IonGrid>
                </IonContent>
            </IonApp>
        </React.Fragment>
    )
};

export default App;
