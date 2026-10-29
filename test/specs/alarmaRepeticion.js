describe('Repeticion de una alarma en Android', () => {
  it('Configurar una alarma para repetirse varios dias', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("09")');
    const minute = await $('android=new UiSelector().text("10")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    const alarm = await $('android=new UiSelector().textContains("09:10")');
    await alarm.click();

    const repeatDays = await $('id=com.google.android.deskclock:id/repeat_days');
    await repeatDays.click();

    const monday = await $('android=new UiSelector().text("M")');
    const friday = await $('android=new UiSelector().text("F")');
    await monday.click();
    await friday.click();

    const saveButton = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await saveButton.click();

    const repeatedAlarm = await $('android=new UiSelector().textContains("09:10")');
    await expect(repeatedAlarm).toBeDisplayed();
  });
});