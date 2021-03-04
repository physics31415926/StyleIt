import { FilterConfig, Image, DeepAiResult } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type FilterType = "fast-style-transfer" | "colorizer" | "torch-srgan"; // the last one is super resolution

interface DeepAiService {
  setApiKey(key: string): void;
  callStandardApi(filterType: FilterType, params: any): Promise<any>;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const deepai: DeepAiService = require("deepai");
deepai.setApiKey("09701ea8-ca61-4004-a821-d68e1ae36e10");

class DeepAiClient {
  callStyleTransfer(content: any, style: any): Promise<DeepAiResult> {
    return deepai.callStandardApi("fast-style-transfer", { content, style });
  }

  callColorize(image: any): Promise<DeepAiResult> {
    return deepai.callStandardApi("colorizer", { image });
  }

  callSuperResolution(image: any): Promise<DeepAiResult> {
    return deepai.callStandardApi("torch-srgan", { image });
  }

  async callApiWithConfig(src: string, config: FilterConfig): Promise<string> {
    let url: string = src;

    try {
      if (config.superResolutionEffect)
        url = (await this.callSuperResolution(url)).output_url;

      if (config.colorizeEffect)
        url = (await this.callColorize(url)).output_url;

      if (config.artImage)
        url = (await this.callStyleTransfer(url, config.artImage.src))
          .output_url;
    } catch {
      throw new Error("Some error happened during the filter process");
    }

    return url;
  }
}

export const deepAiClient = new DeepAiClient();
