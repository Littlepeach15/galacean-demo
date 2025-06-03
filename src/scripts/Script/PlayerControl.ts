import { CharacterController, Keys, Script, Vector3 } from '@galacean/engine';

export default class extends Script {
  private _character: CharacterController;
  private _speed = 0;
  private _upSpeed = 0;
  private _direct = new Vector3(0, 0, 0);
  private _displacement = new Vector3();
  private _moveFactor = 5;


  onAwake() {
    this._character = this.entity.getComponent(CharacterController);
  }

  onUpdate(deltaTime: number) {
    const inputManager = this.engine.inputManager;
    const moveForward = inputManager.isKeyHeldDown(Keys.KeyW) || inputManager.isKeyDown(Keys.KeyW);
    const moveLeft = inputManager.isKeyHeldDown(Keys.KeyA) || inputManager.isKeyDown(Keys.KeyA);
    const moveRight = inputManager.isKeyHeldDown(Keys.KeyD) || inputManager.isKeyDown(Keys.KeyD);
    const moveBackward = inputManager.isKeyHeldDown(Keys.KeyS) || inputManager.isKeyDown(Keys.KeyS);
    const accelerate = inputManager.isKeyDown(Keys.ShiftLeft) || inputManager.isKeyDown(Keys.ShiftRight) || inputManager.isKeyHeldDown(Keys.ShiftLeft) || inputManager.isKeyHeldDown(Keys.ShiftRight);
    const jump = inputManager.isKeyDown(Keys.Space);
    let move = moveForward || moveLeft || moveRight || moveBackward;
    if (!move && this._speed == 0 && !jump && this._upSpeed == 0) {
      return;
    }
    console.log(moveForward, moveLeft, moveRight, moveBackward);
    const forward = this.entity.transform.worldForward;
    this._speed = move ? (1 * (accelerate ? 1.5 : 1)) : 0;
    if (moveForward) {
      this._direct.set(forward.z, 0, -forward.x);
    } else if (moveBackward) {
      this._direct.set(-forward.z, 0, forward.x);
    } else if (moveLeft) {
      this._direct.set(-forward.x, 0, -forward.z);
    } else if (moveRight) {
      this._direct.set(forward.x, 0, forward.z);
    }
    this._direct.normalize();
    Vector3.scale(this._direct, this._speed / this._moveFactor, this._displacement);
    if (jump && this._upSpeed == 0) {
      this._upSpeed = 3;
    }
    if (this._upSpeed != 0) {
      const physicsManager = this.engine.sceneManager.scenes[0].physics;
      const { gravity } = physicsManager;
      this._upSpeed += gravity.y * deltaTime;
      this._displacement.y = this._upSpeed * deltaTime * this._moveFactor;
      const py = this._character.entity.transform.position.y;
      if (py + this._displacement.y < 0.7) {
        this._displacement.y = 0.7 - py;
        this._upSpeed = 0;
      }
      console.log(this._upSpeed, this._displacement.y, py);
    }
    this._character.move(this._displacement, 0, deltaTime);
  }

}