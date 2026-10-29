import { expect } from '@wdio/globals'
import AlarmPage from '../../pageObjects/alarmPage.js'

describe('App de Alarma en Android', () => {

  it('Validar que se abra la app de Reloj', async () => {
    await AlarmPage.alarmTab.waitForDisplayed({ timeout: 5000 });
    await expect(AlarmPage.alarmTab).toBeDisplayed();
  });

  it('Crear una nueva alarma', async () => {
    await AlarmPage.openAlarmTab();
    await AlarmPage.createAlarm("11", "30");

    const isDisplayed = await AlarmPage.isAlarmDisplayed("11:30");
    expect(isDisplayed).toBe(true);
  });

});