import React from 'react';
import {IonCard, IonCardContent, IonCol, IonRow} from '@ionic/react';

const BmiResult: React.FC<{ result: number }> = props => {
    return (
        <IonRow>
            <IonCol>
                <IonCard>
                    <IonCardContent className="ion-text-center">
                        <h2>Your BMI</h2>
                        <p>{props.result.toFixed(2)}</p>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    )
};

export default BmiResult
