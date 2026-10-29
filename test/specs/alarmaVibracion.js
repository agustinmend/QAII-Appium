describe('Vibracion de una alarma en Android', () => {
  it('Activar la vibracion de una alarma', async () => {
    const alarmTab = await $('id=com.google.android.deskclock:id/navigation_bar_item_icon_container');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("12")');
    const minute = await $('android=new UiSelector().text("05")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    const alarm = await $('android=new UiSelector().textContains("12:05")');
    await alarm.click();

    const vibrate = await $('id=com.google.android.deskclock:id/vibrate');
    await vibrate.click();
    await expect(vibrate).toBeSelected();
  });
});