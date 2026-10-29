describe('Repeticion de una alarma en Android', () => {
  it('Configurar una alarma para repetirse varios dias', async () => {
    const alarmTab = await $('//*[@content-desc="Alarm" or @content-desc="Alarma" or @text="Alarm" or @text="Alarma" or @resource-id="com.google.android.deskclock:id/tab_menu_alarm" or @resource-id="com.google.android.deskclock:id/navigation_bar_item_icon_container"]');
    await alarmTab.waitForDisplayed({ timeout: 10000 });
    await alarmTab.click();

    const addButton = await $('//*[@resource-id="com.google.android.deskclock:id/fab" or @content-desc="Add alarm" or @content-desc="Agregar alarma"]');
    await addButton.waitForDisplayed({ timeout: 10000 });
    await addButton.click();

    const hour = await $('android=new UiSelector().text("09")');
    const minute = await $('android=new UiSelector().text("10")');
    await hour.waitForDisplayed({ timeout: 10000 });
    await hour.click();
    await minute.waitForDisplayed({ timeout: 10000 });
    await minute.click();

    const okBtn = await $('//*[@resource-id="com.google.android.deskclock:id/material_timepicker_ok_button" or @text="OK" or @text="Aceptar"]');
    await okBtn.waitForDisplayed({ timeout: 10000 });
    await okBtn.click();

    const alarm = await $('android=new UiSelector().textContains("09:10")');
    await alarm.waitForDisplayed({ timeout: 10000 });
    await alarm.click();

    const repeatDays = await $('//*[@resource-id="com.google.android.deskclock:id/repeat_days" or @resource-id="com.google.android.deskclock:id/days_of_week"]');
    await repeatDays.waitForDisplayed({ timeout: 10000 });
    await repeatDays.click();

    const monday = await $('android=new UiSelector().text("M")');
    const friday = await $('android=new UiSelector().text("F")');
    await monday.waitForDisplayed({ timeout: 10000 });
    await monday.click();
    await friday.waitForDisplayed({ timeout: 10000 });
    await friday.click();

    const saveButton = await $('//*[@resource-id="com.google.android.deskclock:id/material_timepicker_ok_button" or @text="OK" or @text="Aceptar"]');
    if (await saveButton.isDisplayed().catch(() => false)) {
      await saveButton.click();
    }

    const repeatedAlarm = await $('android=new UiSelector().textContains("09:10")');
    await repeatedAlarm.waitForDisplayed({ timeout: 10000 });
    await expect(repeatedAlarm).toBeDisplayed();
  });
});
