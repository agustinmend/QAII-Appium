describe('Editar una alarma en Android', () => {
  it('Editar la hora de una alarma existente', async () => {
    const alarmTab = await $('//*[@content-desc="Alarm" or @content-desc="Alarma" or @text="Alarm" or @text="Alarma" or @resource-id="com.google.android.deskclock:id/tab_menu_alarm" or @resource-id="com.google.android.deskclock:id/navigation_bar_item_icon_container"]');
    await alarmTab.waitForDisplayed({ timeout: 10000 });
    await alarmTab.click();

    const addButton = await $('//*[@resource-id="com.google.android.deskclock:id/fab" or @content-desc="Add alarm" or @content-desc="Agregar alarma"]');
    await addButton.waitForDisplayed({ timeout: 10000 });
    await addButton.click();

    const hour = await $('android=new UiSelector().text("07")');
    const minute = await $('android=new UiSelector().text("15")');
    await hour.waitForDisplayed({ timeout: 10000 });
    await hour.click();
    await minute.waitForDisplayed({ timeout: 10000 });
    await minute.click();

    const okBtn = await $('//*[@resource-id="com.google.android.deskclock:id/material_timepicker_ok_button" or @text="OK" or @text="Aceptar"]');
    await okBtn.waitForDisplayed({ timeout: 10000 });
    await okBtn.click();

    const alarm = await $('android=new UiSelector().textContains("07:15")');
    await alarm.waitForDisplayed({ timeout: 10000 });
    await alarm.click();

    const newHour = await $('android=new UiSelector().text("07")');
    const newMinute = await $('android=new UiSelector().text("20")');
    await newHour.waitForDisplayed({ timeout: 10000 });
    await newHour.click();
    await newMinute.waitForDisplayed({ timeout: 10000 });
    await newMinute.click();
    await okBtn.waitForDisplayed({ timeout: 10000 });
    await okBtn.click();

    const editedAlarm = await $('android=new UiSelector().textContains("07:20")');
    await editedAlarm.waitForDisplayed({ timeout: 10000 });
    await expect(editedAlarm).toBeDisplayed();
  });
});
