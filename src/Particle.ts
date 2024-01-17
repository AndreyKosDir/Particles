import {degreesToRadians} from "./Utils";
import {ParametricGeometries} from "three/examples/jsm/geometries/ParametricGeometries";
import SphereGeometry = ParametricGeometries.SphereGeometry;
import * as THREE from "three";
import {Mesh} from "three/src/objects/Mesh";

/**
 * Координаты точки для текущей отрисовки
 */
export interface IPosition {
    x: number;
    y: number;
    z: number;
}

/**
 * Начальные координаты точки
 */
export interface IInitPosition {
    x0: number;
    y0: number;
    z0: number;
}

interface IParticle {

}

/**
 * Интерфейс информации по частице
 */
interface IParticleInfo {
    // position: IPosition;
    initPosition: IInitPosition;
    // Расстояние от точки до центра координат вокруг которого будет совершаться вращение
    radius: number;
    // Угол между перпендикуляром к плоскости xy в центре и линией от точки до центра координат (0 <= Q <= 180)
    angleQ: number;
    // Угол в плоскости xy (0 <= Q <= 360)
    angleU: number;
    // Угловая скорость Q град/фрейм
    qSpeed: number;
    // Угловая скорость U град/фрейм
    uSpeed: number;

    // Геометрия для частицы
    geometry: SphereGeometry;
    // Цвет частицы
    color: string;

    // calculateConfig - по какой формуле высчитывать
}

/**
 * Класс описывающий частицу, вращающуяся по круговой траектории вокруг центра координат
 */
export default class Particle implements IParticle {
    private _initPosition: IInitPosition;
    private _position: IPosition;
    private _radius: number;
    // В радианах
    private _angleQ: number;
    // В радианах
    private _angleU: number;
    private _qSpeed: number;
    private _uSpeed: number;
    private _particle: Mesh;

    constructor(particleInfo: IParticleInfo) {
        this._initPosition = particleInfo.initPosition;
        this._radius = particleInfo.radius;
        this._angleQ = degreesToRadians(particleInfo.angleQ);
        this._angleU = degreesToRadians(particleInfo.angleU);
        this._qSpeed = particleInfo.qSpeed;
        this._uSpeed = particleInfo.uSpeed;
        return this._initParticle(particleInfo.geometry, particleInfo.color);
    }

    protected _initParticle(geometryParams: SphereGeometry, color: string): void {
        const geometry = new THREE.SphereGeometry(geometryParams);
        const satelliteMaterial = new THREE.MeshBasicMaterial({
            color,
            // wireframe: true
        });
        this._particle = THREE.Mesh(satelliteGeometry, satelliteMaterial);

        return his._particle
    }

    public calculatePosition(): {


    }


}