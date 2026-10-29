class AlarmPage {
  
  // 🔹 Selectores compatibles con emulador local y dispositivos reales BrowserStack (Android 11, 12, 13, 14)
  get alarmTab() { 
    return $('//*[@content-desc="Alarm" or @content-desc="Alarma" or @text="Alarm" or @text="Alarma" or @resource-id="com.google.android.deskclock:id/tab_menu_alarm" or @resource-id="com.google.android.deskclock:id/navigation_bar_item_icon_container"]'); 
  }

  get addButton() { 
    return $('//*[@resource-id="com.google.android.deskclock:id/fab" or @content-desc="Add alarm" or @content-desc="Agregar alarma" or @content-desc="Add" or @content-desc="Agregar"]'); 
  }

  get okBtn() { 
    return $('//*[@resource-id="com.google.android.deskclock:id/material_timepicker_ok_button" or @text="OK" or @text="Aceptar"]'); 
  }

  get cancelBtn() { 
    return $('//*[@resource-id="com.google.android.deskclock:id/material_timepicker_cancel_button" or @text="Cancel" or @text="Cancelar"]'); 
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
    return $('//*[@resource-id="com.google.android.deskclock:id/delete_button" or @resource-id="com.google.android.deskclock:id/delete" or @content-desc="Delete" or @content-desc="Eliminar"]');
  }

  // 🔹 Métodos de acción
  async openAlarmTab() {
    // Si aparece diálogo de permisos de notificaciones del sistema en Android 13/14
    try {
      const allowBtn = await $('//*[@resource-id="com.android.permissioncontroller:id/permission_allow_button" or @text="Allow" or @text="Permitir"]');
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

    const hourEl = this.hourElement(hour);
    await hourEl.waitForDisplayed({ timeout: 10000 });
    await hourEl.click();

    const minEl = this.minuteElement(minute);
    await minEl.waitForDisplayed({ timeout: 10000 });
    await minEl.click();

    await this.okBtn.waitForDisplayed({ timeout: 10000 });
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

    const hourEl = this.hourElement(hour);
    await hourEl.waitForDisplayed({ timeout: 10000 });
    await hourEl.click();

    const minEl = this.minuteElement(minute);
    await minEl.waitForDisplayed({ timeout: 10000 });
    await minEl.click();

    await this.cancelBtn.waitForDisplayed({ timeout: 10000 });
    await this.cancelBtn.click();
  }

  async deleteAlarm(time, position) {
    const alarm = await this.alarmWithTime(time);
    await alarm.waitForDisplayed({ timeout: 10000 });
    await expect(alarm).toBeDisplayed();

    const expand = await this.expandAlarm(position);
    if (await expand.isDisplayed().catch(() => false)) {
      await expand.click();
      await driver.pause(1500);
    }

    const delBtn = await this.deleteBtn();
    await delBtn.waitForDisplayed({ timeout: 10000 });
    await delBtn.click();
  }

}

module.exports = new AlarmPage();
