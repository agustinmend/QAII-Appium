import { expect } from '@wdio/globals'
import AlarmPage from '../../pageObjects/alarmPage.js'

describe('App de Alarma en Android', () => {

    it('Validar que se abra la app de Reloj', async () => {
        await AlarmPage.alarmTab.waitForDisplayed({ timeout: 10000 });
        await expect(AlarmPage.alarmTab).toBeDisplayed();
    });

    it('Crear una nueva alarma', async () => {
        await AlarmPage.openAlarmTab();
        await AlarmPage.createAlarm("11", "30");

        const newAlarm = await AlarmPage.alarmWithTime("11:30");
        await expect(newAlarm).toBeDisplayed();
    });

    it('Crear una nueva alarma Cancelando', async () => {
        await AlarmPage.openAlarmTab();
        await AlarmPage.cancelAlarm("10", "30");

        const cancelledAlarm = await AlarmPage.alarmWithTime("10:30");
        await expect(cancelledAlarm).not.toExist();
    });

});
