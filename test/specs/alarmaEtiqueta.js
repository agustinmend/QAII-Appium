describe('Etiqueta de una alarma en Android', () => {
  it('Agregar una etiqueta a una alarma', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("10")');
    const minute = await $('android=new UiSelector().text("20")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    const alarm = await $('android=new UiSelector().textContains("10:20")');
    await alarm.click();

    const labelButton = await $('id=com.google.android.deskclock:id/edit_label');
    await labelButton.click();

    const labelInput = await $('id=android:id/input');
    await labelInput.setValue('Medicamento');

    const labelOkButton = await $('android=new UiSelector().text("OK")');
    await labelOkButton.click();

    const label = await $('android=new UiSelector().text("Medicamento")');
    await expect(label).toBeDisplayed();
  });
});