describe('Activar y desactivar una alarma en Android', () => {
  it('Desactivar una alarma activa y volver a activarla', async () => {
    const alarmTab = await $('//*[@content-desc="Alarm" or @content-desc="Alarma" or @text="Alarm" or @text="Alarma" or @resource-id="com.google.android.deskclock:id/tab_menu_alarm" or @resource-id="com.google.android.deskclock:id/navigation_bar_item_icon_container"]');
    await alarmTab.waitForDisplayed({ timeout: 10000 });
    await alarmTab.click();

    const addButton = await $('//*[@resource-id="com.google.android.deskclock:id/fab" or @content-desc="Add alarm" or @content-desc="Agregar alarma"]');
    await addButton.waitForDisplayed({ timeout: 10000 });
    await addButton.click();

    const hour = await $('android=new UiSelector().text("08")');
    const minute = await $('android=new UiSelector().text("00")');
    await hour.waitForDisplayed({ timeout: 10000 });
    await hour.click();
    await minute.waitForDisplayed({ timeout: 10000 });
    await minute.click();

    const okBtn = await $('//*[@resource-id="com.google.android.deskclock:id/material_timepicker_ok_button" or @text="OK" or @text="Aceptar"]');
    await okBtn.waitForDisplayed({ timeout: 10000 });
    await okBtn.click();

    const alarmSwitch = await $('android=new UiSelector().resourceId("com.google.android.deskclock:id/onoff")');
    await alarmSwitch.waitForDisplayed({ timeout: 10000 });
    await expect(alarmSwitch).toBeDisplayed();
    await alarmSwitch.click();
    await expect(alarmSwitch).not.toBeSelected();

    await alarmSwitch.click();
    await expect(alarmSwitch).toBeSelected();
  });
});
