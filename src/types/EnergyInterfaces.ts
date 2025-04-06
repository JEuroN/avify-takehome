export interface IEnergyData {
    fuel: string;
    perc: number;
  }

export interface IEnergyResult {
    generationmix: IEnergyData[];
    to: string;
    from: string;
  }
  