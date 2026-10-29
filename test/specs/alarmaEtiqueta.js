describe('Etiqueta de una alarma en Android', () => {
  it('Agregar una etiqueta a una alarma', async () => {
    const alarmTab = await $('//*[@content-desc="Alarm" or @content-desc="Alarma" or @text="Alarm" or @text="Alarma" or @resource-id="com.google.android.deskclock:id/tab_menu_alarm" or @resource-id="com.google.android.deskclock:id/navigation_bar_item_icon_container"]');
    await alarmTab.waitForDisplayed({ timeout: 10000 });
    await alarmTab.click();

    const addButton = await $('//*[@resource-id="com.google.android.deskclock:id/fab" or @content-desc="Add alarm" or @content-desc="Agregar alarma"]');
    await addButton.waitForDisplayed({ timeout: 10000 });
    await addButton.click();

    const hour = await $('android=new UiSelector().text("10")');
    const minute = await $('android=new UiSelector().text("20")');
    await hour.waitForDisplayed({ timeout: 10000 });
    await hour.click();
    await minute.waitForDisplayed({ timeout: 10000 });
    await minute.click();

    const okBtn = await $('//*[@resource-id="com.google.android.deskclock:id/material_timepicker_ok_button" or @text="OK" or @text="Aceptar"]');
    await okBtn.waitForDisplayed({ timeout: 10000 });
    await okBtn.click();

    const alarm = await $('android=new UiSelector().textContains("10:20")');
    await alarm.waitForDisplayed({ timeout: 10000 });
    await alarm.click();

    const labelButton = await $('//*[@resource-id="com.google.android.deskclock:id/edit_label" or @resource-id="com.google.android.deskclock:id/label"]');
    await labelButton.waitForDisplayed({ timeout: 10000 });
    await labelButton.click();

    const labelInput = await $('id=android:id/input');
    await labelInput.waitForDisplayed({ timeout: 10000 });
    await labelInput.setValue('Medicamento');

    const labelOkButton = await $('//*[@text="OK" or @text="Aceptar" or @resource-id="android:id/button1"]');
    await labelOkButton.waitForDisplayed({ timeout: 10000 });
    await labelOkButton.click();

    const label = await $('android=new UiSelector().text("Medicamento")');
    await label.waitForDisplayed({ timeout: 10000 });
    await expect(label).toBeDisplayed();
  });
});
