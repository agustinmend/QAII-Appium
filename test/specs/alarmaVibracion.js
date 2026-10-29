describe('Vibracion de una alarma en Android', () => {
  it('Activar la vibracion de una alarma', async () => {
    const alarmTab = await $('//*[@content-desc="Alarm" or @content-desc="Alarma" or @text="Alarm" or @text="Alarma" or @resource-id="com.google.android.deskclock:id/tab_menu_alarm" or @resource-id="com.google.android.deskclock:id/navigation_bar_item_icon_container"]');
    await alarmTab.waitForDisplayed({ timeout: 10000 });
    await alarmTab.click();

    const addButton = await $('//*[@resource-id="com.google.android.deskclock:id/fab" or @content-desc="Add alarm" or @content-desc="Agregar alarma"]');
    await addButton.waitForDisplayed({ timeout: 10000 });
    await addButton.click();

    const hour = await $('android=new UiSelector().text("12")');
    const minute = await $('android=new UiSelector().text("05")');
    await hour.waitForDisplayed({ timeout: 10000 });
    await hour.click();
    await minute.waitForDisplayed({ timeout: 10000 });
    await minute.click();

    const okBtn = await $('//*[@resource-id="com.google.android.deskclock:id/material_timepicker_ok_button" or @text="OK" or @text="Aceptar"]');
    await okBtn.waitForDisplayed({ timeout: 10000 });
    await okBtn.click();

    const alarm = await $('android=new UiSelector().textContains("12:05")');
    await alarm.waitForDisplayed({ timeout: 10000 });
    await alarm.click();

    const vibrate = await $('//*[@resource-id="com.google.android.deskclock:id/vibrate" or @resource-id="com.google.android.deskclock:id/vibrate_icon"]');
    await vibrate.waitForDisplayed({ timeout: 10000 });
    await vibrate.click();
    await expect(vibrate).toBeDisplayed();
  });
});
