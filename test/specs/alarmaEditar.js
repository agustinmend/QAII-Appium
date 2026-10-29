describe('Editar una alarma en Android', () => {
  it('Editar la hora de una alarma existente', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("07")');
    const minute = await $('android=new UiSelector().text("15")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    const alarm = await $('android=new UiSelector().textContains("07:15")');
    await alarm.click();

    const newHour = await $('android=new UiSelector().text("07")');
    const newMinute = await $('android=new UiSelector().text("20")');
    await newHour.click();
    await newMinute.click();
    await okBtn.click();

    const editedAlarm = await $('android=new UiSelector().textContains("07:20")');
    await expect(editedAlarm).toBeDisplayed();
  });
});