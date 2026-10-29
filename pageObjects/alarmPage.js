class AlarmPage {
  
  // 🔹 Selectores compatibles con emulador local y dispositivos reales BrowserStack (Android 11, 12, 13, 14)
  get alarmTab() { 
    return $('//android.widget.FrameLayout[@content-desc="Alarm" or @content-desc="Alarma"] | //*[@resource-id="com.google.android.deskclock:id/tab_menu_alarm"] | //*[@resource-id="com.google.android.deskclock:id/navigation_bar_item_icon_container"] | ~Alarm | ~Alarma'); 
  }

  get addButton() { 
    return $('//*[@resource-id="com.google.android.deskclock:id/fab"] | ~Add alarm | ~Agregar alarma | //*[@content-desc="Add alarm" or @content-desc="Agregar alarma"]'); 
  }

  get okBtn() { 
    return $('id=com.google.android.deskclock:id/material_timepicker_ok_button, //*[@text="OK" or @text="Aceptar"]'); 
  }

  get cancelBtn() { 
    return $('id=com.google.android.deskclock:id/material_timepicker_cancel_button, //*[@text="Cancel" or @text="Cancelar"]'); 
  }

  // Selector dinámico para la hora/minuto
  hourElement(hour) { 
    return $(`android=new UiSelector().text("${hour}")`);
  }

  minuteElement(minute) { 
    return $(`android=new UiSelector().text("${minute}")`);
  }

  alarmWithTime(time) {
    return $(`android=new UiSelector().textContains("${time}")`);
  }

  expandAlarm(position) {
    return $(`(//android.view.View[@resource-id="com.google.android.deskclock:id/clock_switch_flow"])[${position}]`);
  }

  deleteBtn() {
    return $('android=new UiSelector().resourceId("com.google.android.deskclock:id/delete_button"), //*[@resource-id="com.google.android.deskclock:id/delete"]');
  }

  // 🔹 Métodos de acción
  async openAlarmTab() {
    // Si aparece diálogo de permisos de notificaciones del sistema en Android 13/14
    try {
      const allowBtn = await $('id=com.android.permissioncontroller:id/permission_allow_button, //*[@text="Allow" or @text="Permitir"]');
      if (await allowBtn.isDisplayed()) {
        await allowBtn.click();
      }
    } catch (e) {}

    await this.alarmTab.waitForDisplayed({ timeout: 10000 });
    await this.alarmTab.click();
  }

  async createAlarm(hour, minute) {
    await this.addButton.waitForDisplayed({ timeout: 10000 });
    await this.addButton.click();

    await this.hourElement(hour).click();
    await this.minuteElement(minute).click();

    await this.okBtn.click();
  }

  async isAlarmDisplayed(time) {
    const alarm = this.alarmWithTime(time);
    await alarm.waitForDisplayed({ timeout: 10000 });
    return alarm.isDisplayed();
  }

  async cancelAlarm(hour, minute) {
    await this.addButton.waitForDisplayed({ timeout: 10000 });
    await this.addButton.click();
    await this.hourElement(hour).click();
    await this.minuteElement(minute).click();

    await this.cancelBtn.click();
  }

  async deleteAlarm(time, position) {
    const alarm = await this.alarmWithTime(time);
    await expect(alarm).toBeDisplayed();

    const expand = await this.expandAlarm(position);
    if (await expand.isDisplayed()) {
      await expand.click();
      await driver.pause(2000);
    }

    const delBtn = await this.deleteBtn();
    await driver.pause(2000);
    await delBtn.waitForDisplayed({ timeout: 10000 });
    await delBtn.click();
  }

}

module.exports = new AlarmPage();
