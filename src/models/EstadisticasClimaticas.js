'use strict';

export class EstadisticasClimaticas {
    constructor(
        /**
         * @description Unique identifier
         */
        uuid,
        /**
         * @description Weather Station
         */
        estacion,
        /**
         * @description Temperature (°C)
         */
        temp,
        /**
         * @description Maximun temperature (°C)
         */
        tempMax,
        /**
         * @description Minimum temperature (°C)
         */
        tempMin,
        /**
         * @description Relative humidity (%)
         */
        humRel,
        /**
         * @description Wind speed (km/h)
         */
        velViento,
        /**
         * @description Total cloudiness (octavos)
         */
        nubosTotal,
        /**
         * @description Precipitation (mm)
         */
        precip,
        /**
         * @description Freq. of days with Precip above 1.0 mm (mm)
         */
        frecDiasPrecipSup
    ) {
        this.uuid = uuid,
            this.estacion = estacion,
            this.temp = temp,
            this.tempMax = tempMax,
            this.tempMin = tempMin,
            this.humRel = humRel,
            this.velViento = velViento,
            this.nubosTotal = nubosTotal,
            this.precip = precip,
            this.frecDiasPrecipSup = frecDiasPrecipSup
    }
    getUuid() {
        return this.uuid;
    }
    setUuid(uuid) {
        return this.uuid;
    }
    getEstacion() {
        return this.estacion;
    }
    setEstacion(estacion) {
        return this.estacion;
    }
    getTemp() {
        return this.temp;
    }
    setTemp(temp) {
        return this.temp;
    }
    getTempMax() {
        return this.tempMax;
    }
    setTempMax(tempMax) {
        return this.tempMax;
    }
    getTempMin() {
        return this.tempMin;
    }
    setTempMin(tempMin) {
        return this.tempMin;
    }
    getHumRel() {
        return this.humRel;
    }
    setHumRel(humRel) {
        return this.humRel;
    }
    getVelViento() {
        return this.velViento;
    }
    setVelViento(velViento) {
        return this.velViento;
    }
    getNubosTotal() {
        return this.nubosTotal;
    }
    setNubosTotal(nubosTotal) {
        return this.nubosTotal;
    }
    getPrecip() {
        return this.precip;
    }
    setPrecip(precip) {
        return this.precip;
    }
    getFrecDiasPrecipSup() {
        return this.frecDiasPrecipSup;
    }
    setFrecDiasPrecipSup(frecDiasPrecipSup) {
        return this.frecDiasPrecipSup;
    }


    toString() {
        return `[ Uuid : ${this.getUuid()} , estacion : ${this.getEstacion()}, Temperatura (°C) : ${this.getTemp()}, Temperatura máxima (°C) : ${this.getTempMax()}, Temperatura mínima (°C) : ${this.getTempMin()}, Humedad Relativa (%) : ${this.getHumRel()}, Velocidad del viento (km/h) : ${this.getVelViento()}, Nubosidad total (octavos) : ${this.getNubosTotal()}, Precipitación (mm) : ${this.getPrecip()}, Frec. de días con Precip sup a 1.0 mm (mm) : ${this.getFrecDiasPrecipSup()} ] `;
    }




}

