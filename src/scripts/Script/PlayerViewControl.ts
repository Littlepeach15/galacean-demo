import { MeshRenderer, Script } from "@galacean/engine";

export default class extends Script {
  private _sensitivity = 0.0005;
  private _yaw = Math.PI;

  onStart() {
    window.addEventListener("mousedown", () => {
      document.documentElement.requestPointerLock();
      window.addEventListener("mousemove", e => {
        this._yaw -= e.movementX * this._sensitivity;
      });
    });
  }

  onUpdate(deltaTime: number) {
    const value = Math.PI * 2;
    this._yaw = this._yaw % value;
    if (this._yaw < 0) {
      this._yaw = (this._yaw + value) % value;
    }
    this.entity.transform.rotationQuaternion.identity().rotateY(this._yaw);
  }

}