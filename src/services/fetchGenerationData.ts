import { IEnergyResult } from "../types/EnergyInterfaces";

const API_URL = "https://api.carbonintensity.org.uk";

export const fetchGenerationData = async (): Promise<IEnergyResult> => {
    try {
        const response = await fetch(`${API_URL}/generation`);
        const json = await response.json();
        return json.data as IEnergyResult;
    } catch (error) {
        throw new Error("Failed fetch from api");
    }
};
