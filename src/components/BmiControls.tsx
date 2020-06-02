import {IonButton, IonCol, IonIcon, IonRow} from '@ionic/react';
import {calculatorOutline, refreshOutline} from 'ionicons/icons';
import React from 'react';

const BmiControls: React.FC<{onCalculate: () => void; onReset: () => void}> = props => {
    return (
        <IonRow>
            <IonCol className="ion-text-left">
                <IonButton onClick={props.onCalculate}>
                    <IonIcon icon={calculatorOutline} slot="start"/>
                    Calculate
                </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
                <IonButton onClick={props.onReset}>
                    <IonIcon icon={refreshOutline} slot="start"/>
                    Reset
                </IonButton>
            </IonCol>
        </IonRow>
    )
}

export default BmiControls
