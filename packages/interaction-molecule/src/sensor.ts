import { Sensor as JFSensor } from 'johnny-five';
import { Component } from './component';

export type SensorEvent = 'change' | 'data';
export type SensorData = {};
export type SensorOptions = {
  pin: number;
};

export class Sensor implements Component {
  private j5Sensor: JFSensor;

  constructor(options: SensorOptions) {
    this.j5Sensor = new JFSensor(options.pin);
  }

  on(event: SensorEvent, callback: (data: SensorData) => void) {
    this.j5Sensor.on(event, () => {
      callback({});
    });
  }
}
