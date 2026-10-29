describe('Activar y desactivar una alarma en Android', () => {
  it('Desactivar una alarma activa y volver a activarla', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("08")');
    const minute = await $('android=new UiSelector().text("00")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    const alarmSwitch = await $('android=new UiSelector().resourceId("com.google.android.deskclock:id/onoff")');
    await expect(alarmSwitch).toBeDisplayed();
    await alarmSwitch.click();
    await expect(alarmSwitch).not.toBeSelected();

    await alarmSwitch.click();
    await expect(alarmSwitch).toBeSelected();
  });
});