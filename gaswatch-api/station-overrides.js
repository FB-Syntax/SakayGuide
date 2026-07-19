// GasWatch PH — Community Price Overrides
// Per-station community-reported prices
// Updated: July 14, 2026 | 969 settled + 721 brand-estimated stations (DOE-synthesized: Jul 7 baseline + Jul 14 deltas)
// Keys: data.js station ID → fuel type → {p: price, r: 1=community/0=official, e: 1=brand-estimated}
const STATION_OVERRIDES = {
  "1": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "3": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "4": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "5": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "6": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "7": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "8": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "9": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "10": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "11": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "12": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "13": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "14": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "15": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "17": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "18": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "19": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "20": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "21": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "22": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "23": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "unleaded": {
      "p": 82,
      "r": 0
    },
    "premium95": {
      "p": 91.2,
      "r": 0
    }
  },
  "24": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "25": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "26": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "27": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "28": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "29": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "30": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "31": {
    "diesel": {
      "p": 78.7,
      "r": 0
    },
    "unleaded": {
      "p": 81.3,
      "r": 0
    },
    "premium95": {
      "p": 89.5,
      "r": 0
    }
  },
  "32": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "33": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "35": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "36": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "37": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "38": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "39": {
    "diesel": {
      "p": 77.91,
      "r": 0
    },
    "unleaded": {
      "p": 77.1,
      "r": 0
    },
    "premium95": {
      "p": 78.1,
      "r": 0
    }
  },
  "40": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "41": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "42": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "43": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "44": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "45": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "46": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "47": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "48": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "50": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "51": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 79.05,
      "r": 0
    },
    "premium95": {
      "p": 82.05,
      "r": 0
    }
  },
  "52": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "53": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "54": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "55": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "56": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "57": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "58": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "59": {
    "diesel": {
      "p": 80.36,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.34,
      "r": 0
    },
    "unleaded": {
      "p": 84.18,
      "r": 0
    },
    "premium95": {
      "p": 87.89,
      "r": 0
    }
  },
  "60": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "61": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "62": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "63": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "64": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "65": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "66": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "67": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "68": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "69": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "70": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "71": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "72": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "73": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "74": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "76": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "77": {
    "diesel": {
      "p": 73.79,
      "r": 0
    },
    "unleaded": {
      "p": 77.28,
      "r": 0
    },
    "premium95": {
      "p": 78.28,
      "r": 0
    }
  },
  "78": {
    "diesel": {
      "p": 76.89,
      "r": 0
    },
    "unleaded": {
      "p": 77.78,
      "r": 0
    },
    "premium95": {
      "p": 78.78,
      "r": 0
    }
  },
  "79": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "80": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "81": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "82": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "83": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "84": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "85": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "86": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "87": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "88": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "89": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "90": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "91": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "92": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "93": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "94": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "95": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "96": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "97": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "98": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "99": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "100": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "101": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "102": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "103": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "104": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 86.8,
      "r": 0
    }
  },
  "105": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "106": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "107": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "108": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "109": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "110": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "111": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "112": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "113": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "114": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "115": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "116": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "117": {
    "diesel": {
      "p": 78.46,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.46,
      "r": 0
    },
    "unleaded": {
      "p": 81.4,
      "r": 0
    },
    "premium95": {
      "p": 82.4,
      "r": 0
    },
    "premium97": {
      "p": 92.4,
      "r": 0
    }
  },
  "118": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "119": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "120": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "122": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "123": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "124": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "130": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "131": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "132": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "133": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "134": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "136": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium95": {
      "p": 75.18,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "137": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "138": {
    "diesel": {
      "p": 78.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 80.88,
      "r": 0
    },
    "premium95": {
      "p": 75.18,
      "r": 0
    },
    "premium97": {
      "p": 81.83,
      "r": 0
    }
  },
  "139": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "140": {
    "diesel": {
      "p": 78.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 80.88,
      "r": 0
    },
    "premium97": {
      "p": 81.83,
      "r": 0
    }
  },
  "141": {
    "diesel": {
      "p": 81.3,
      "r": 0
    },
    "unleaded": {
      "p": 82.55,
      "r": 0
    },
    "premium97": {
      "p": 83.47,
      "r": 0
    }
  },
  "142": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "143": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "144": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "150": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "151": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "152": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "153": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "154": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "155": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "156": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "160": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "161": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "162": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "163": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "164": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "166": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "167": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "168": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "170": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "171": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "172": {
    "diesel": {
      "p": 81.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.7,
      "r": 0
    },
    "premium95": {
      "p": 97,
      "r": 0
    },
    "premium97": {
      "p": 102.5,
      "r": 0
    }
  },
  "173": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "174": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "175": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "176": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "177": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "178": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "179": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "180": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "181": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "182": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "183": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "184": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "185": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "186": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "187": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "188": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "189": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "190": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "191": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "192": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "194": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "195": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "196": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "197": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "198": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "199": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "200": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "201": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "202": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "203": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "204": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "205": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "206": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "207": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "210": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "211": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "212": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "213": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "214": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "215": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "217": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "218": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "219": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "221": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "224": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "225": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "227": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "228": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "229": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "232": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "233": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "234": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "235": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 79.05,
      "r": 0
    },
    "premium95": {
      "p": 82.05,
      "r": 0
    }
  },
  "236": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 79.05,
      "r": 0
    },
    "premium95": {
      "p": 82.05,
      "r": 0
    }
  },
  "237": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "238": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "239": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "240": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "241": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "242": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "243": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "244": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "245": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "246": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "247": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "249": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "250": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "253": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 83.54,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "255": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 83.54,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "256": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "257": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "259": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 83.54,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "260": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "261": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "262": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "263": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium95": {
      "p": 75.18,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "264": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium95": {
      "p": 75.18,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "265": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "266": {
    "diesel": {
      "p": 77.91,
      "r": 0
    },
    "unleaded": {
      "p": 77.1,
      "r": 0
    },
    "premium95": {
      "p": 78.1,
      "r": 0
    }
  },
  "267": {
    "diesel": {
      "p": 77.91,
      "r": 0
    },
    "unleaded": {
      "p": 77.1,
      "r": 0
    },
    "premium95": {
      "p": 78.1,
      "r": 0
    }
  },
  "269": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "270": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    }
  },
  "272": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    }
  },
  "273": {
    "diesel": {
      "p": 75.4,
      "r": 0
    },
    "unleaded": {
      "p": 76.22,
      "r": 0
    }
  },
  "274": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "275": {
    "diesel": {
      "p": 75.4,
      "r": 0
    },
    "unleaded": {
      "p": 76.22,
      "r": 0
    }
  },
  "276": {
    "diesel": {
      "p": 75.4,
      "r": 0
    },
    "unleaded": {
      "p": 76.22,
      "r": 0
    }
  },
  "277": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "278": {
    "diesel": {
      "p": 73.79,
      "r": 0
    },
    "unleaded": {
      "p": 77.28,
      "r": 0
    },
    "premium95": {
      "p": 78.28,
      "r": 0
    }
  },
  "279": {
    "diesel": {
      "p": 73.79,
      "r": 0
    },
    "unleaded": {
      "p": 77.28,
      "r": 0
    },
    "premium95": {
      "p": 78.28,
      "r": 0
    }
  },
  "280": {
    "diesel": {
      "p": 73.79,
      "r": 0
    },
    "unleaded": {
      "p": 77.28,
      "r": 0
    },
    "premium95": {
      "p": 78.28,
      "r": 0
    }
  },
  "281": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "282": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "283": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "284": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "285": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "286": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "287": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "288": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "289": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "290": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "291": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "292": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "293": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "294": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "295": {
    "diesel": {
      "p": 81.63,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 87.84,
      "r": 0
    },
    "premium95": {
      "p": 88.84,
      "r": 0
    }
  },
  "296": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "297": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "298": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "299": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "300": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "301": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "302": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "303": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "304": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "305": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "306": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "308": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "309": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "310": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "311": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "313": {
    "diesel": {
      "p": 74.9,
      "r": 0
    },
    "unleaded": {
      "p": 74.68,
      "r": 0
    },
    "premium95": {
      "p": 75.18,
      "r": 0
    }
  },
  "316": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 79.05,
      "r": 0
    },
    "premium95": {
      "p": 82.05,
      "r": 0
    }
  },
  "317": {
    "diesel": {
      "p": 85.73,
      "r": 0
    },
    "unleaded": {
      "p": 80.83,
      "r": 0
    },
    "premium95": {
      "p": 81.83,
      "r": 0
    },
    "premium97": {
      "p": 92.9,
      "r": 0
    }
  },
  "320": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "321": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "322": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "323": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "324": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "325": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "326": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "327": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 83.54,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "328": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 83.54,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "330": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "331": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "332": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    }
  },
  "333": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "334": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "335": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "336": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "337": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "338": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "339": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "340": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "341": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "342": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "343": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "344": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "345": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "346": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "347": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "348": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "349": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "350": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "351": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "353": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "354": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "356": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "357": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "358": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "359": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "360": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "361": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "362": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "363": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "365": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 83.54,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "366": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "368": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "369": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "370": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "371": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "372": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "373": {
    "diesel": {
      "p": 75.4,
      "r": 0
    },
    "unleaded": {
      "p": 76.22,
      "r": 0
    }
  },
  "374": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "375": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "376": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "377": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "378": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "379": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "380": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "381": {
    "diesel": {
      "p": 77.91,
      "r": 0
    },
    "unleaded": {
      "p": 77.1,
      "r": 0
    },
    "premium95": {
      "p": 78.1,
      "r": 0
    }
  },
  "383": {
    "diesel": {
      "p": 77.91,
      "r": 0
    },
    "unleaded": {
      "p": 77.1,
      "r": 0
    },
    "premium95": {
      "p": 78.1,
      "r": 0
    }
  },
  "384": {
    "diesel": {
      "p": 77.91,
      "r": 0
    },
    "unleaded": {
      "p": 77.1,
      "r": 0
    },
    "premium95": {
      "p": 78.1,
      "r": 0
    }
  },
  "385": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "386": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "387": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "388": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "389": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "392": {
    "diesel": {
      "p": 83.29,
      "r": 0
    },
    "unleaded": {
      "p": 82.68,
      "r": 0
    },
    "premium95": {
      "p": 83.68,
      "r": 0
    }
  },
  "394": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "395": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "396": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "397": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "399": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "400": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "401": {
    "diesel": {
      "p": 78.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 80.88,
      "r": 0
    },
    "premium97": {
      "p": 81.83,
      "r": 0
    }
  },
  "403": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "404": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "405": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "407": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "409": {
    "diesel": {
      "p": 81.63,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 87.84,
      "r": 0
    },
    "premium95": {
      "p": 88.84,
      "r": 0
    }
  },
  "410": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "411": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "412": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "413": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "415": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "416": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "417": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "418": {
    "diesel": {
      "p": 81.63,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 87.84,
      "r": 0
    },
    "premium95": {
      "p": 88.84,
      "r": 0
    }
  },
  "419": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "420": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "421": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "422": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "423": {
    "diesel": {
      "p": 81.63,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 87.84,
      "r": 0
    },
    "premium95": {
      "p": 88.84,
      "r": 0
    }
  },
  "424": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "425": {
    "diesel": {
      "p": 83.29,
      "r": 0
    },
    "unleaded": {
      "p": 82.68,
      "r": 0
    },
    "premium95": {
      "p": 83.68,
      "r": 0
    }
  },
  "426": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "427": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "428": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "429": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "430": {
    "diesel": {
      "p": 81.63,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 87.84,
      "r": 0
    },
    "premium95": {
      "p": 88.84,
      "r": 0
    }
  },
  "431": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "432": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "433": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "434": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "435": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "437": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "439": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "440": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "441": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "442": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "443": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "444": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "445": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "446": {
    "diesel": {
      "p": 77.09,
      "r": 0
    },
    "unleaded": {
      "p": 79.38,
      "r": 0
    },
    "premium95": {
      "p": 80.38,
      "r": 0
    }
  },
  "447": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "448": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "450": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "451": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "453": {
    "diesel": {
      "p": 85.73,
      "r": 0
    },
    "unleaded": {
      "p": 80.83,
      "r": 0
    },
    "premium95": {
      "p": 81.83,
      "r": 0
    },
    "premium97": {
      "p": 92.9,
      "r": 0
    }
  },
  "454": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "455": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 79.05,
      "r": 0
    },
    "premium95": {
      "p": 82.05,
      "r": 0
    }
  },
  "456": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "457": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "458": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "459": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "460": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "461": {
    "diesel": {
      "p": 78.9,
      "r": 0
    },
    "premiumDiesel": {
      "p": 78.9,
      "r": 0
    },
    "unleaded": {
      "p": 81.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    }
  },
  "462": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "463": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 71.5,
      "r": 1
    },
    "premium95": {
      "p": 72.6,
      "r": 1
    },
    "premium97": {
      "p": 73.7,
      "r": 1
    }
  },
  "464": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "466": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "467": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "468": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "469": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "470": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "471": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "472": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "473": {
    "diesel": {
      "p": 81.63,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 87.84,
      "r": 0
    },
    "premium95": {
      "p": 88.84,
      "r": 0
    }
  },
  "474": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "475": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "476": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "477": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "478": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "479": {
    "diesel": {
      "p": 84.37,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 85.44,
      "r": 0
    },
    "premium95": {
      "p": 86.44,
      "r": 0
    }
  },
  "480": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "481": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "482": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "483": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "484": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "485": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "486": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "487": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "488": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "489": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "490": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "491": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "492": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "493": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "494": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "496": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "497": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "499": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "500": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "501": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "502": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "503": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "504": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "505": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "506": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "507": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "509": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "510": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "511": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "512": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "513": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "514": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "515": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "516": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "517": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "518": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "519": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "520": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "521": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "522": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "523": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "524": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "525": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "527": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "528": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "529": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "530": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "531": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "532": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "533": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "535": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "536": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "537": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "538": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "539": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "540": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "541": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "542": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "543": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "544": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "545": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "546": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "548": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "549": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "550": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "552": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "554": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "556": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "557": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "558": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "560": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "561": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "562": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "565": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "566": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "567": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "568": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "569": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "570": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "571": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "572": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "573": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "574": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "575": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "576": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "577": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "578": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "579": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "581": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "582": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "583": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "584": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "585": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "586": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "587": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "588": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "589": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "591": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "592": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "593": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "594": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "595": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "596": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "597": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "598": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "599": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "600": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "601": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "602": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "603": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "604": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "605": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "606": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "608": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "609": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "610": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "611": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "612": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "613": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "614": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "615": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "616": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "617": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "618": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "620": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "621": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "622": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "623": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "624": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "627": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "628": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "630": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "631": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "632": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "633": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "634": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "635": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "636": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "637": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "638": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "643": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "644": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "645": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "646": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "647": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "648": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "649": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "650": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "651": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "652": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "653": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "654": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "655": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "656": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "657": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "658": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "659": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "660": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "661": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "662": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "663": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "664": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "665": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "666": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "667": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "668": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "669": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "670": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "671": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "672": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "673": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "674": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "675": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "677": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "678": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "679": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "682": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "684": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "685": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "686": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "687": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "689": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "690": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "691": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "692": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "693": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "694": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "695": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "696": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "697": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "698": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "700": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "702": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "703": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "704": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "705": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "706": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "707": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "708": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "709": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "710": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "711": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "712": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "713": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "714": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "715": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "716": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "717": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "718": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "719": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "720": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "721": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "722": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "723": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "724": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "726": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "727": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "728": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "730": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "734": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "736": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "737": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "738": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    }
  },
  "739": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "740": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "741": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "742": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "743": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "744": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "745": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "746": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "747": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "748": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "749": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "750": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "751": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "752": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "753": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "754": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    }
  },
  "755": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "764": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 75.8,
      "r": 0
    },
    "premium95": {
      "p": 76.8,
      "r": 0
    },
    "premium97": {
      "p": 86.8,
      "r": 0
    }
  },
  "767": {
    "diesel": {
      "p": 75.99,
      "r": 0
    },
    "unleaded": {
      "p": 73.42,
      "r": 0
    },
    "premium95": {
      "p": 74.42,
      "r": 0
    }
  },
  "770": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "773": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "774": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 82,
      "r": 0
    },
    "premium95": {
      "p": 91.2,
      "r": 0
    }
  },
  "775": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 82,
      "r": 0
    },
    "premium95": {
      "p": 91.2,
      "r": 0
    }
  },
  "776": {
    "diesel": {
      "p": 77.26,
      "r": 0
    },
    "unleaded": {
      "p": 73.72,
      "r": 0
    },
    "premium97": {
      "p": 74.82,
      "r": 0
    }
  },
  "777": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "780": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "782": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "789": {
    "diesel": {
      "p": 78.7,
      "r": 0
    },
    "unleaded": {
      "p": 81.3,
      "r": 0
    },
    "premium95": {
      "p": 89.5,
      "r": 0
    }
  },
  "792": {
    "diesel": {
      "p": 78.9,
      "r": 0
    },
    "premiumDiesel": {
      "p": 90.1,
      "r": 0
    },
    "unleaded": {
      "p": 82.6,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 96.2,
      "r": 0
    }
  },
  "794": {
    "diesel": {
      "p": 75.49,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "795": {
    "diesel": {
      "p": 78,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.4,
      "r": 0
    },
    "unleaded": {
      "p": 78.5,
      "r": 0
    },
    "premium95": {
      "p": 89.4,
      "r": 0
    },
    "premium97": {
      "p": 93.4,
      "r": 0
    }
  },
  "796": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "799": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 86.8,
      "r": 0
    }
  },
  "800": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "802": {
    "diesel": {
      "p": 78,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.4,
      "r": 0
    },
    "unleaded": {
      "p": 78.5,
      "r": 0
    },
    "premium95": {
      "p": 89.4,
      "r": 0
    },
    "premium97": {
      "p": 93.4,
      "r": 0
    }
  },
  "803": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "805": {
    "diesel": {
      "p": 77.26,
      "r": 0
    },
    "unleaded": {
      "p": 76.65,
      "r": 0
    },
    "premium95": {
      "p": 79.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "807": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "808": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "811": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "813": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "814": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 75.8,
      "r": 0
    },
    "premium95": {
      "p": 76.8,
      "r": 0
    },
    "premium97": {
      "p": 86.8,
      "r": 0
    }
  },
  "815": {
    "diesel": {
      "p": 73.79,
      "r": 0
    },
    "unleaded": {
      "p": 77.28,
      "r": 0
    },
    "premium95": {
      "p": 78.28,
      "r": 0
    }
  },
  "817": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "818": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.1,
      "r": 0
    },
    "premium95": {
      "p": 80.1,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "824": {
    "diesel": {
      "p": 75.4,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 76.22,
      "r": 0
    },
    "premium95": {
      "p": 86.44,
      "r": 0
    }
  },
  "825": {
    "diesel": {
      "p": 75.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.32,
      "r": 0
    },
    "premium97": {
      "p": 84.32,
      "r": 0
    }
  },
  "826": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.1,
      "r": 0
    },
    "premium95": {
      "p": 80.1,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "827": {
    "diesel": {
      "p": 77.91,
      "r": 0
    },
    "unleaded": {
      "p": 77.1,
      "r": 0
    },
    "premium95": {
      "p": 78.1,
      "r": 0
    }
  },
  "829": {
    "diesel": {
      "p": 73.79,
      "r": 0
    },
    "unleaded": {
      "p": 77.28,
      "r": 0
    },
    "premium95": {
      "p": 78.28,
      "r": 0
    }
  },
  "830": {
    "diesel": {
      "p": 73.79,
      "r": 0
    },
    "unleaded": {
      "p": 77.28,
      "r": 0
    },
    "premium95": {
      "p": 78.28,
      "r": 0
    }
  },
  "832": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "unleaded": {
      "p": 82,
      "r": 0
    },
    "premium95": {
      "p": 91.2,
      "r": 0
    }
  },
  "835": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "838": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "839": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.1,
      "r": 0
    },
    "premium95": {
      "p": 80.1,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "841": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "844": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "845": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.1,
      "r": 0
    },
    "premium95": {
      "p": 80.1,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "852": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "853": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "854": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "855": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "857": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "859": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "861": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "862": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "863": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "866": {
    "diesel": {
      "p": 78,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.4,
      "r": 0
    },
    "unleaded": {
      "p": 78.5,
      "r": 0
    },
    "premium95": {
      "p": 89.4,
      "r": 0
    },
    "premium97": {
      "p": 93.4,
      "r": 0
    }
  },
  "867": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "868": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "869": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "870": {
    "diesel": {
      "p": 78.7,
      "r": 0
    },
    "unleaded": {
      "p": 81.3,
      "r": 0
    },
    "premium95": {
      "p": 89.5,
      "r": 0
    }
  },
  "872": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "873": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "874": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "875": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "877": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 86.8,
      "r": 0
    }
  },
  "878": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "880": {
    "diesel": {
      "p": 84.37,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 85.44,
      "r": 0
    },
    "premium95": {
      "p": 86.44,
      "r": 0
    }
  },
  "881": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "882": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "883": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "884": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 86.8,
      "r": 0
    }
  },
  "886": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "888": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "889": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "891": {
    "diesel": {
      "p": 78.7,
      "r": 0
    },
    "unleaded": {
      "p": 81.3,
      "r": 0
    },
    "premium95": {
      "p": 89.5,
      "r": 0
    }
  },
  "892": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "893": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "894": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.1,
      "r": 0
    },
    "premium95": {
      "p": 80.1,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "895": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "896": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "897": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "899": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "901": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "903": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "905": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "906": {
    "diesel": {
      "p": 75.4,
      "r": 0
    },
    "unleaded": {
      "p": 76.22,
      "r": 0
    }
  },
  "908": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "909": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "910": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "911": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 86.8,
      "r": 0
    }
  },
  "913": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "915": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "919": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "923": {
    "diesel": {
      "p": 77.91,
      "r": 0
    },
    "unleaded": {
      "p": 77.1,
      "r": 0
    },
    "premium95": {
      "p": 78.1,
      "r": 0
    }
  },
  "924": {
    "diesel": {
      "p": 73.79,
      "r": 0
    },
    "unleaded": {
      "p": 77.28,
      "r": 0
    },
    "premium95": {
      "p": 78.28,
      "r": 0
    }
  },
  "926": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "927": {
    "diesel": {
      "p": 78.4,
      "r": 0
    },
    "unleaded": {
      "p": 80.6,
      "r": 0
    },
    "premium95": {
      "p": 92.3,
      "r": 0
    }
  },
  "928": {
    "diesel": {
      "p": 78.7,
      "r": 0
    },
    "unleaded": {
      "p": 81.3,
      "r": 0
    },
    "premium95": {
      "p": 89.5,
      "r": 0
    }
  },
  "929": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "unleaded": {
      "p": 82,
      "r": 0
    },
    "premium95": {
      "p": 91.2,
      "r": 0
    }
  },
  "932": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "938": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.54,
      "r": 1
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "939": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.15,
      "r": 0
    },
    "premium95": {
      "p": 80.15,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "940": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "944": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "946": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "947": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "951": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.1,
      "r": 0
    },
    "premium95": {
      "p": 80.1,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "957": {
    "diesel": {
      "p": 78.7,
      "r": 0
    },
    "unleaded": {
      "p": 81.3,
      "r": 0
    },
    "premium95": {
      "p": 89.5,
      "r": 0
    }
  },
  "960": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "962": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "963": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "965": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "967": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "971": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "974": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "981": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "983": {
    "diesel": {
      "p": 75.4,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 76.22,
      "r": 0
    },
    "premium95": {
      "p": 86.44,
      "r": 0
    }
  },
  "985": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "989": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "991": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 75.8,
      "r": 0
    },
    "premium95": {
      "p": 76.8,
      "r": 0
    },
    "premium97": {
      "p": 86.8,
      "r": 0
    }
  },
  "1001": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1003": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1009": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1012": {
    "diesel": {
      "p": 75.4,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 76.22,
      "r": 0
    },
    "premium95": {
      "p": 86.44,
      "r": 0
    }
  },
  "1014": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1015": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.1,
      "r": 0
    },
    "premium95": {
      "p": 80.1,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "1021": {
    "diesel": {
      "p": 78.9,
      "r": 0
    },
    "premiumDiesel": {
      "p": 90.1,
      "r": 0
    },
    "unleaded": {
      "p": 82.6,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 96.2,
      "r": 0
    }
  },
  "1023": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "1027": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1029": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "1032": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.15,
      "r": 0
    },
    "premium95": {
      "p": 80.15,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1045": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1046": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "1050": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "1054": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "1056": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "1060": {
    "diesel": {
      "p": 77.26,
      "r": 0
    },
    "unleaded": {
      "p": 73.72,
      "r": 0
    },
    "premium97": {
      "p": 74.82,
      "r": 0
    }
  },
  "1062": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "1063": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1064": {
    "diesel": {
      "p": 77.26,
      "r": 0
    },
    "unleaded": {
      "p": 73.72,
      "r": 0
    },
    "premium97": {
      "p": 74.82,
      "r": 0
    }
  },
  "1065": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "1067": {
    "diesel": {
      "p": 75.99,
      "r": 0
    },
    "unleaded": {
      "p": 73.42,
      "r": 0
    },
    "premium95": {
      "p": 74.42,
      "r": 0
    }
  },
  "1069": {
    "diesel": {
      "p": 78,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.4,
      "r": 0
    },
    "unleaded": {
      "p": 78.5,
      "r": 0
    },
    "premium95": {
      "p": 89.4,
      "r": 0
    },
    "premium97": {
      "p": 93.4,
      "r": 0
    }
  },
  "1070": {
    "diesel": {
      "p": 78,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.4,
      "r": 0
    },
    "unleaded": {
      "p": 78.5,
      "r": 0
    },
    "premium95": {
      "p": 89.4,
      "r": 0
    },
    "premium97": {
      "p": 93.4,
      "r": 0
    }
  },
  "1071": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "1074": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "1076": {
    "diesel": {
      "p": 75.4,
      "r": 0
    },
    "unleaded": {
      "p": 76.22,
      "r": 0
    }
  },
  "1078": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.15,
      "r": 0
    },
    "premium95": {
      "p": 80.15,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1079": {
    "diesel": {
      "p": 75.4,
      "r": 0
    },
    "unleaded": {
      "p": 76.22,
      "r": 0
    }
  },
  "1083": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "1087": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "1088": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "1089": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "1090": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1091": {
    "diesel": {
      "p": 78.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.8,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 90.4,
      "r": 0
    },
    "premium97": {
      "p": 104.3,
      "r": 0
    }
  },
  "1096": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1097": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.15,
      "r": 0
    },
    "premium95": {
      "p": 80.15,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1099": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "1101": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1104": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1105": {
    "diesel": {
      "p": 78.9,
      "r": 0
    },
    "premiumDiesel": {
      "p": 90.1,
      "r": 0
    },
    "unleaded": {
      "p": 82.6,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 96.2,
      "r": 0
    }
  },
  "1106": {
    "diesel": {
      "p": 78.9,
      "r": 0
    },
    "premiumDiesel": {
      "p": 90.1,
      "r": 0
    },
    "unleaded": {
      "p": 82.6,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 96.2,
      "r": 0
    }
  },
  "1108": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "1112": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1113": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "1114": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1115": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1116": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1122": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1123": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.1,
      "r": 0
    },
    "premium95": {
      "p": 80.1,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "1124": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1125": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "1130": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1134": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "1136": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "1141": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.15,
      "r": 0
    },
    "premium95": {
      "p": 80.15,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1142": {
    "diesel": {
      "p": 77.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.62,
      "r": 0
    },
    "premium97": {
      "p": 78.52,
      "r": 0
    }
  },
  "1144": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 86.8,
      "r": 0
    }
  },
  "1146": {
    "diesel": {
      "p": 77.91,
      "r": 0
    },
    "unleaded": {
      "p": 77.1,
      "r": 0
    },
    "premium95": {
      "p": 78.1,
      "r": 0
    }
  },
  "1148": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "1149": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "1152": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 75.8,
      "r": 0
    },
    "premium95": {
      "p": 76.8,
      "r": 0
    },
    "premium97": {
      "p": 86.8,
      "r": 0
    }
  },
  "1153": {
    "diesel": {
      "p": 78,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.4,
      "r": 0
    },
    "unleaded": {
      "p": 78.5,
      "r": 0
    },
    "premium95": {
      "p": 89.4,
      "r": 0
    },
    "premium97": {
      "p": 93.4,
      "r": 0
    }
  },
  "1156": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1160": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1161": {
    "diesel": {
      "p": 76.7,
      "r": 0
    },
    "unleaded": {
      "p": 76.4,
      "r": 0
    },
    "premium95": {
      "p": 77.5,
      "r": 0
    }
  },
  "1164": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1165": {
    "diesel": {
      "p": 77.86,
      "r": 0
    },
    "unleaded": {
      "p": 79.25,
      "r": 0
    },
    "premium95": {
      "p": 82.25,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1169": {
    "diesel": {
      "p": 76.79,
      "r": 0
    },
    "unleaded": {
      "p": 76.78,
      "r": 0
    },
    "premium97": {
      "p": 77.78,
      "r": 0
    }
  },
  "1170": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    },
    "premium97": {
      "p": 86.8,
      "r": 0
    }
  },
  "1171": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1172": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.1,
      "r": 0
    },
    "premium95": {
      "p": 80.1,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "1175": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.1,
      "r": 0
    },
    "premium95": {
      "p": 80.1,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "1177": {
    "diesel": {
      "p": 78.9,
      "r": 0
    },
    "premiumDiesel": {
      "p": 90.1,
      "r": 0
    },
    "unleaded": {
      "p": 82.6,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 96.2,
      "r": 0
    }
  },
  "1179": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "1182": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.15,
      "r": 0
    },
    "premium95": {
      "p": 80.15,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1184": {
    "diesel": {
      "p": 77.26,
      "r": 0
    },
    "unleaded": {
      "p": 76.65,
      "r": 0
    },
    "premium95": {
      "p": 79.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1185": {
    "diesel": {
      "p": 77.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.65,
      "r": 0
    },
    "premium95": {
      "p": 81.65,
      "r": 0
    },
    "premium97": {
      "p": 85.15,
      "r": 0
    }
  },
  "1187": {
    "diesel": {
      "p": 76.79,
      "r": 0
    },
    "unleaded": {
      "p": 76.78,
      "r": 0
    },
    "premium97": {
      "p": 77.78,
      "r": 0
    }
  },
  "1188": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "1191": {
    "diesel": {
      "p": 77.26,
      "r": 0
    },
    "unleaded": {
      "p": 73.72,
      "r": 0
    },
    "premium97": {
      "p": 74.82,
      "r": 0
    }
  },
  "1192": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "1193": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1194": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1195": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "1197": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1199": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "1202": {
    "diesel": {
      "p": 78.7,
      "r": 0
    },
    "unleaded": {
      "p": 81.3,
      "r": 0
    },
    "premium95": {
      "p": 89.5,
      "r": 0
    }
  },
  "1204": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1205": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "1208": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1209": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "1210": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1213": {
    "diesel": {
      "p": 78.7,
      "r": 0
    },
    "unleaded": {
      "p": 81.3,
      "r": 0
    },
    "premium95": {
      "p": 89.5,
      "r": 0
    }
  },
  "1214": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1215": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1217": {
    "diesel": {
      "p": 76.89,
      "r": 0
    },
    "unleaded": {
      "p": 77.78,
      "r": 0
    },
    "premium95": {
      "p": 78.78,
      "r": 0
    }
  },
  "1219": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1220": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1226": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1229": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1230": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1231": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1234": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "1236": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1238": {
    "diesel": {
      "p": 76.89,
      "r": 0
    },
    "unleaded": {
      "p": 77.78,
      "r": 0
    },
    "premium95": {
      "p": 78.78,
      "r": 0
    }
  },
  "1241": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "1243": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1244": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1246": {
    "diesel": {
      "p": 81.31,
      "r": 0
    },
    "unleaded": {
      "p": 81.9,
      "r": 0
    },
    "premium95": {
      "p": 83.9,
      "r": 0
    }
  },
  "1253": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1259": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1261": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1265": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "1268": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "1269": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "1273": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1285": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "1290": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1293": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1295": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1296": {
    "diesel": {
      "p": 77.6,
      "r": 0
    },
    "unleaded": {
      "p": 75.88,
      "r": 0
    },
    "premium97": {
      "p": 76.88,
      "r": 0
    }
  },
  "1297": {
    "diesel": {
      "p": 78.7,
      "r": 0
    },
    "unleaded": {
      "p": 81.3,
      "r": 0
    },
    "premium95": {
      "p": 89.5,
      "r": 0
    }
  },
  "1303": {
    "diesel": {
      "p": 78.7,
      "r": 0
    },
    "unleaded": {
      "p": 81.3,
      "r": 0
    },
    "premium95": {
      "p": 89.5,
      "r": 0
    }
  },
  "1307": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1308": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1310": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1312": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "1313": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "1318": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1320": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1321": {
    "diesel": {
      "p": 78.9,
      "r": 0
    },
    "premiumDiesel": {
      "p": 78.9,
      "r": 0
    },
    "unleaded": {
      "p": 81.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    }
  },
  "1323": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1327": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1332": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1333": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 79.05,
      "r": 0
    },
    "premium95": {
      "p": 82.05,
      "r": 0
    }
  },
  "1334": {
    "diesel": {
      "p": 77.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.76,
      "r": 0
    },
    "unleaded": {
      "p": 78,
      "r": 0
    },
    "premium95": {
      "p": 79,
      "r": 0
    },
    "premium97": {
      "p": 89,
      "r": 0
    }
  },
  "1335": {
    "diesel": {
      "p": 78.86,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 78.8,
      "r": 0
    },
    "premium95": {
      "p": 79.8,
      "r": 0
    },
    "premium97": {
      "p": 89.8,
      "r": 0
    }
  },
  "1336": {
    "diesel": {
      "p": 77.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.95,
      "r": 0
    },
    "unleaded": {
      "p": 84.45,
      "r": 0
    },
    "premium95": {
      "p": 92.45,
      "r": 0
    }
  },
  "1340": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91,
      "r": 0
    },
    "premium97": {
      "p": 105.6,
      "r": 0
    }
  },
  "1341": {
    "diesel": {
      "p": 81.7,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.7,
      "r": 0
    },
    "unleaded": {
      "p": 82.9,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    },
    "premium97": {
      "p": 92.8,
      "r": 0
    }
  },
  "1342": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1343": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1344": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1345": {
    "diesel": {
      "p": 77.09,
      "r": 0
    },
    "unleaded": {
      "p": 79.38,
      "r": 0
    },
    "premium95": {
      "p": 80.38,
      "r": 0
    }
  },
  "1346": {
    "diesel": {
      "p": 81.63,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 87.84,
      "r": 0
    },
    "premium95": {
      "p": 88.84,
      "r": 0
    }
  },
  "1347": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1348": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1349": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1350": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1351": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1352": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1353": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1354": {
    "diesel": {
      "p": 78.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 80.88,
      "r": 0
    },
    "premium95": {
      "p": 75.18,
      "r": 0
    },
    "premium97": {
      "p": 81.83,
      "r": 0
    }
  },
  "1355": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "1356": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1357": {
    "diesel": {
      "p": 74.9,
      "r": 0
    },
    "unleaded": {
      "p": 74.68,
      "r": 0
    },
    "premium95": {
      "p": 75.18,
      "r": 0
    }
  },
  "1358": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1359": {
    "diesel": {
      "p": 73.79,
      "r": 0
    },
    "unleaded": {
      "p": 77.28,
      "r": 0
    },
    "premium95": {
      "p": 78.28,
      "r": 0
    }
  },
  "1360": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "1361": {
    "diesel": {
      "p": 77.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.96,
      "r": 0
    },
    "unleaded": {
      "p": 78.7,
      "r": 0
    },
    "premium95": {
      "p": 79.7,
      "r": 0
    },
    "premium97": {
      "p": 89.7,
      "r": 0
    }
  },
  "1362": {
    "diesel": {
      "p": 74.9,
      "r": 0
    },
    "unleaded": {
      "p": 74.68,
      "r": 0
    },
    "premium95": {
      "p": 75.18,
      "r": 0
    }
  },
  "1363": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.2,
      "r": 0
    },
    "premium95": {
      "p": 80.2,
      "r": 0
    },
    "premium97": {
      "p": 90.2,
      "r": 0
    }
  },
  "1364": {
    "diesel": {
      "p": 83.05,
      "r": 0
    },
    "premiumDiesel": {
      "p": 83.54,
      "r": 0
    },
    "unleaded": {
      "p": 86.08,
      "r": 0
    },
    "premium95": {
      "p": 95.68,
      "r": 0
    }
  },
  "1365": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "1368": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "1369": {
    "diesel": {
      "p": 81.3,
      "r": 0
    },
    "unleaded": {
      "p": 82.55,
      "r": 0
    },
    "premium97": {
      "p": 83.47,
      "r": 0
    }
  },
  "1370": {
    "diesel": {
      "p": 78.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.76,
      "r": 0
    },
    "unleaded": {
      "p": 82.7,
      "r": 0
    },
    "premium95": {
      "p": 83.7,
      "r": 0
    },
    "premium97": {
      "p": 93.7,
      "r": 0
    }
  },
  "1371": {
    "diesel": {
      "p": 80.56,
      "r": 0
    },
    "premiumDiesel": {
      "p": 83.56,
      "r": 0
    },
    "unleaded": {
      "p": 82.62,
      "r": 0
    },
    "premium95": {
      "p": 83.64,
      "r": 0
    }
  },
  "1372": {
    "diesel": {
      "p": 77.36,
      "r": 0
    },
    "unleaded": {
      "p": 79.75,
      "r": 0
    },
    "premium95": {
      "p": 82.75,
      "r": 0
    }
  },
  "1373": {
    "diesel": {
      "p": 80.36,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.34,
      "r": 0
    },
    "unleaded": {
      "p": 84.18,
      "r": 0
    },
    "premium95": {
      "p": 87.89,
      "r": 0
    }
  },
  "1374": {
    "diesel": {
      "p": 78.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.76,
      "r": 0
    },
    "unleaded": {
      "p": 82.7,
      "r": 0
    },
    "premium95": {
      "p": 83.7,
      "r": 0
    },
    "premium97": {
      "p": 93.7,
      "r": 0
    }
  },
  "1375": {
    "diesel": {
      "p": 83.29,
      "r": 0
    },
    "unleaded": {
      "p": 82.68,
      "r": 0
    },
    "premium95": {
      "p": 83.68,
      "r": 0
    }
  },
  "1376": {
    "diesel": {
      "p": 81.63,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 87.84,
      "r": 0
    },
    "premium95": {
      "p": 88.84,
      "r": 0
    }
  },
  "1377": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1378": {
    "diesel": {
      "p": 78.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.76,
      "r": 0
    },
    "unleaded": {
      "p": 82.7,
      "r": 0
    },
    "premium95": {
      "p": 83.7,
      "r": 0
    },
    "premium97": {
      "p": 93.7,
      "r": 0
    }
  },
  "1379": {
    "diesel": {
      "p": 81.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.7,
      "r": 0
    },
    "premium95": {
      "p": 97,
      "r": 0
    },
    "premium97": {
      "p": 102.5,
      "r": 0
    }
  },
  "1380": {
    "diesel": {
      "p": 81.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.7,
      "r": 0
    },
    "premium95": {
      "p": 97,
      "r": 0
    },
    "premium97": {
      "p": 102.5,
      "r": 0
    }
  },
  "1381": {
    "diesel": {
      "p": 78.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.76,
      "r": 0
    },
    "unleaded": {
      "p": 82.7,
      "r": 0
    },
    "premium95": {
      "p": 83.7,
      "r": 0
    },
    "premium97": {
      "p": 93.7,
      "r": 0
    }
  },
  "1382": {
    "diesel": {
      "p": 78.76,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.76,
      "r": 0
    },
    "unleaded": {
      "p": 82.7,
      "r": 0
    },
    "premium95": {
      "p": 83.7,
      "r": 0
    },
    "premium97": {
      "p": 93.7,
      "r": 0
    }
  },
  "1383": {
    "diesel": {
      "p": 81.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.7,
      "r": 0
    },
    "premium95": {
      "p": 97,
      "r": 0
    },
    "premium97": {
      "p": 102.5,
      "r": 0
    }
  },
  "1384": {
    "diesel": {
      "p": 80.36,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.34,
      "r": 0
    },
    "unleaded": {
      "p": 84.18,
      "r": 0
    },
    "premium95": {
      "p": 87.89,
      "r": 0
    }
  },
  "1386": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1387": {
    "diesel": {
      "p": 81.3,
      "r": 0
    },
    "unleaded": {
      "p": 82.55,
      "r": 0
    },
    "premium97": {
      "p": 83.47,
      "r": 0
    }
  },
  "1388": {
    "diesel": {
      "p": 77.91,
      "r": 0
    },
    "unleaded": {
      "p": 77.1,
      "r": 0
    },
    "premium95": {
      "p": 78.1,
      "r": 0
    }
  },
  "1389": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "1391": {
    "diesel": {
      "p": 78.16,
      "r": 0
    },
    "premiumDiesel": {
      "p": 80.26,
      "r": 0
    },
    "unleaded": {
      "p": 80.5,
      "r": 0
    },
    "premium95": {
      "p": 81.5,
      "r": 0
    }
  },
  "1397": {
    "diesel": {
      "p": 78,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.4,
      "r": 0
    },
    "unleaded": {
      "p": 78.5,
      "r": 0
    },
    "premium95": {
      "p": 89.4,
      "r": 0
    },
    "premium97": {
      "p": 93.4,
      "r": 0
    }
  },
  "1400": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1401": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1403": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1404": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1405": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1406": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1408": {
    "diesel": {
      "p": 77.09,
      "r": 0
    },
    "unleaded": {
      "p": 79.38,
      "r": 0
    },
    "premium95": {
      "p": 80.38,
      "r": 0
    }
  },
  "1409": {
    "diesel": {
      "p": 74.99,
      "r": 0
    },
    "unleaded": {
      "p": 80.53,
      "r": 0
    },
    "premium95": {
      "p": 81.53,
      "r": 0
    }
  },
  "1410": {
    "diesel": {
      "p": 77.09,
      "r": 0
    },
    "unleaded": {
      "p": 79.38,
      "r": 0
    },
    "premium95": {
      "p": 80.38,
      "r": 0
    }
  },
  "1411": {
    "diesel": {
      "p": 77.09,
      "r": 0
    },
    "unleaded": {
      "p": 79.38,
      "r": 0
    },
    "premium95": {
      "p": 80.38,
      "r": 0
    }
  },
  "1415": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1416": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1417": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1418": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1420": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1421": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1423": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1424": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1425": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1426": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1427": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1429": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1430": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1431": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1433": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1434": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1435": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "1436": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1437": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1438": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1439": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1442": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1443": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1444": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1445": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1447": {
    "diesel": {
      "p": 78.2,
      "r": 0
    },
    "unleaded": {
      "p": 77,
      "r": 0
    },
    "premium95": {
      "p": 78,
      "r": 0
    }
  },
  "1448": {
    "diesel": {
      "p": 81.63,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 87.84,
      "r": 0
    },
    "premium95": {
      "p": 88.84,
      "r": 0
    }
  },
  "1451": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "1453": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "1460": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1461": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1462": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1463": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1464": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1465": {
    "diesel": {
      "p": 75.79,
      "r": 0
    },
    "unleaded": {
      "p": 76.78,
      "r": 0
    },
    "premium95": {
      "p": 76.78,
      "r": 0
    }
  },
  "1466": {
    "diesel": {
      "p": 74.99,
      "r": 0
    },
    "unleaded": {
      "p": 80.53,
      "r": 0
    },
    "premium95": {
      "p": 81.53,
      "r": 0
    }
  },
  "1468": {
    "diesel": {
      "p": 78.36,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.36,
      "r": 0
    },
    "unleaded": {
      "p": 76.9,
      "r": 0
    },
    "premium95": {
      "p": 77.9,
      "r": 0
    }
  },
  "1469": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.36,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1470": {
    "diesel": {
      "p": 78.36,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.36,
      "r": 0
    },
    "unleaded": {
      "p": 76.9,
      "r": 0
    },
    "premium95": {
      "p": 77.9,
      "r": 0
    }
  },
  "1471": {
    "diesel": {
      "p": 78.36,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.36,
      "r": 0
    },
    "unleaded": {
      "p": 76.9,
      "r": 0
    },
    "premium95": {
      "p": 77.9,
      "r": 0
    }
  },
  "1472": {
    "diesel": {
      "p": 78.36,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.36,
      "r": 0
    },
    "unleaded": {
      "p": 76.9,
      "r": 0
    },
    "premium95": {
      "p": 77.9,
      "r": 0
    }
  },
  "1473": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1474": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1475": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1476": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.36,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1477": {
    "diesel": {
      "p": 78.36,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.36,
      "r": 0
    },
    "unleaded": {
      "p": 76.9,
      "r": 0
    },
    "premium95": {
      "p": 77.9,
      "r": 0
    }
  },
  "1478": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1479": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1480": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1481": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1483": {
    "diesel": {
      "p": 77.73,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "1484": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1485": {
    "diesel": {
      "p": 78.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 80.88,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    },
    "premium97": {
      "p": 81.83,
      "r": 0
    }
  },
  "1486": {
    "diesel": {
      "p": 78.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 80.88,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    },
    "premium97": {
      "p": 81.83,
      "r": 0
    }
  },
  "1487": {
    "diesel": {
      "p": 78.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 80.88,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    },
    "premium97": {
      "p": 81.83,
      "r": 0
    }
  },
  "1488": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.1,
      "r": 0
    },
    "unleaded": {
      "p": 83.4,
      "r": 0
    },
    "premium95": {
      "p": 91.3,
      "r": 0
    },
    "premium97": {
      "p": 97.1,
      "r": 0
    }
  },
  "1489": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1490": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1491": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1492": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.1,
      "r": 0
    },
    "unleaded": {
      "p": 83.4,
      "r": 0
    },
    "premium95": {
      "p": 91.3,
      "r": 0
    },
    "premium97": {
      "p": 97.1,
      "r": 0
    }
  },
  "1493": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1494": {
    "diesel": {
      "p": 78.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.55,
      "r": 0
    }
  },
  "1495": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1496": {
    "diesel": {
      "p": 81.63,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 87.84,
      "r": 0
    },
    "premium95": {
      "p": 88.84,
      "r": 0
    }
  },
  "1497": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1498": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1500": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1501": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1502": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.2,
      "r": 0
    },
    "unleaded": {
      "p": 85.15,
      "r": 0
    },
    "premium95": {
      "p": 91.4,
      "r": 0
    }
  },
  "1503": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1504": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1505": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.36,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1506": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1507": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1508": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.06,
      "r": 0
    },
    "unleaded": {
      "p": 80.4,
      "r": 0
    },
    "premium95": {
      "p": 81.4,
      "r": 0
    },
    "premium97": {
      "p": 91.4,
      "r": 0
    }
  },
  "1509": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1510": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1511": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1514": {
    "diesel": {
      "p": 78.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 80.88,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    },
    "premium97": {
      "p": 81.83,
      "r": 0
    }
  },
  "1515": {
    "diesel": {
      "p": 78.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 80.88,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    },
    "premium97": {
      "p": 81.83,
      "r": 0
    }
  },
  "1516": {
    "diesel": {
      "p": 78.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 80.88,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    },
    "premium97": {
      "p": 81.83,
      "r": 0
    }
  },
  "1517": {
    "diesel": {
      "p": 78.99,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 80.88,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    },
    "premium97": {
      "p": 81.83,
      "r": 0
    }
  },
  "1518": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1519": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1520": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1521": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1522": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1523": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1524": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1525": {
    "diesel": {
      "p": 80.5,
      "r": 0
    },
    "premiumDiesel": {
      "p": 88.9,
      "r": 0
    },
    "unleaded": {
      "p": 85.2,
      "r": 0
    },
    "premium95": {
      "p": 95.2,
      "r": 0
    },
    "premium97": {
      "p": 100.2,
      "r": 0
    }
  },
  "1526": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1527": {
    "diesel": {
      "p": 78.2,
      "r": 0
    },
    "unleaded": {
      "p": 77,
      "r": 0
    },
    "premium95": {
      "p": 78,
      "r": 0
    }
  },
  "1528": {
    "diesel": {
      "p": 81.63,
      "r": 0
    },
    "premiumDiesel": {
      "p": 84.23,
      "r": 0
    },
    "unleaded": {
      "p": 87.84,
      "r": 0
    },
    "premium95": {
      "p": 88.84,
      "r": 0
    }
  },
  "1529": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.25,
      "r": 0
    }
  },
  "1530": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 84.45,
      "r": 0
    }
  },
  "1531": {
    "diesel": {
      "p": 79.66,
      "r": 0
    },
    "unleaded": {
      "p": 81.45,
      "r": 0
    },
    "premium95": {
      "p": 84.45,
      "r": 0
    }
  },
  "1532": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1533": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1534": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1538": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1539": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1540": {
    "diesel": {
      "p": 78.36,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.36,
      "r": 0
    },
    "unleaded": {
      "p": 76.9,
      "r": 0
    },
    "premium95": {
      "p": 77.9,
      "r": 0
    }
  },
  "1541": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.4,
      "r": 0
    },
    "premium95": {
      "p": 79.4,
      "r": 0
    }
  },
  "1542": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1543": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1544": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.4,
      "r": 0
    },
    "premium95": {
      "p": 79.4,
      "r": 0
    }
  },
  "1545": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1546": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.4,
      "r": 0
    },
    "premium95": {
      "p": 79.4,
      "r": 0
    }
  },
  "1547": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1548": {
    "diesel": {
      "p": 82.08,
      "r": 0
    },
    "unleaded": {
      "p": 82.52,
      "r": 0
    },
    "premium95": {
      "p": 83.02,
      "r": 0
    }
  },
  "1549": {
    "diesel": {
      "p": 82.08,
      "r": 0
    },
    "unleaded": {
      "p": 82.52,
      "r": 0
    },
    "premium95": {
      "p": 83.02,
      "r": 0
    }
  },
  "1550": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1551": {
    "diesel": {
      "p": 77.73,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "1552": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1553": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1554": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1555": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1556": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1557": {
    "diesel": {
      "p": 79.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.1,
      "r": 0
    },
    "unleaded": {
      "p": 83.4,
      "r": 0
    },
    "premium95": {
      "p": 91.3,
      "r": 0
    },
    "premium97": {
      "p": 97.1,
      "r": 0
    }
  },
  "1558": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1559": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1560": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1561": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1562": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1563": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1564": {
    "diesel": {
      "p": 79.66,
      "r": 0
    },
    "unleaded": {
      "p": 81.45,
      "r": 0
    },
    "premium95": {
      "p": 84.45,
      "r": 0
    }
  },
  "1565": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1566": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1567": {
    "diesel": {
      "p": 74.99,
      "r": 0
    },
    "unleaded": {
      "p": 80.53,
      "r": 0
    },
    "premium95": {
      "p": 81.53,
      "r": 0
    }
  },
  "1570": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1571": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.21,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1572": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1573": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1574": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1575": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1576": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1577": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1578": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1580": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1581": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1582": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1583": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1584": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1585": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1586": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1587": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1588": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1589": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1590": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1591": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1593": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 78.4,
      "r": 0
    },
    "premium95": {
      "p": 79.4,
      "r": 0
    }
  },
  "1594": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1595": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1597": {
    "diesel": {
      "p": 77.73,
      "r": 0
    },
    "unleaded": {
      "p": 75.68,
      "r": 0
    },
    "premium95": {
      "p": 76.68,
      "r": 0
    }
  },
  "1598": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1599": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1600": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1601": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1602": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1603": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1604": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1605": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1606": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 82.36,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    },
    "premium97": {
      "p": 91.8,
      "r": 0
    }
  },
  "1607": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1608": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1609": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1610": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1611": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1612": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1613": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1614": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1615": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1616": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1617": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "1618": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1619": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1620": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1621": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1622": {
    "diesel": {
      "p": 74.99,
      "r": 0
    },
    "unleaded": {
      "p": 80.53,
      "r": 0
    },
    "premium95": {
      "p": 81.53,
      "r": 0
    }
  },
  "1623": {
    "diesel": {
      "p": 74.99,
      "r": 0
    },
    "unleaded": {
      "p": 80.53,
      "r": 0
    },
    "premium95": {
      "p": 81.53,
      "r": 0
    }
  },
  "1625": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1626": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1627": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1628": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1629": {
    "diesel": {
      "p": 82.08,
      "r": 0
    },
    "unleaded": {
      "p": 82.52,
      "r": 0
    },
    "premium95": {
      "p": 83.02,
      "r": 0
    }
  },
  "1630": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1631": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1632": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1633": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1634": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1635": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1636": {
    "diesel": {
      "p": 79.66,
      "r": 0
    },
    "unleaded": {
      "p": 81.45,
      "r": 0
    },
    "premium95": {
      "p": 84.45,
      "r": 0
    }
  },
  "1637": {
    "diesel": {
      "p": 79.66,
      "r": 0
    },
    "unleaded": {
      "p": 81.45,
      "r": 0
    },
    "premium95": {
      "p": 84.45,
      "r": 0
    }
  },
  "1638": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1639": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1640": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1641": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1642": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1644": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.36,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1645": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1646": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1647": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    },
    "premium97": {
      "p": 90.3,
      "r": 0
    }
  },
  "1648": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.86,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    },
    "premium97": {
      "p": 90.3,
      "r": 0
    }
  },
  "1649": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1650": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1651": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1652": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1653": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1654": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1655": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1656": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1657": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1658": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1659": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1660": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1661": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1662": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1663": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1664": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1665": {
    "diesel": {
      "p": 79.66,
      "r": 0
    },
    "unleaded": {
      "p": 81.45,
      "r": 0
    },
    "premium95": {
      "p": 84.45,
      "r": 0
    }
  },
  "1666": {
    "diesel": {
      "p": 79.66,
      "r": 0
    },
    "unleaded": {
      "p": 81.45,
      "r": 0
    },
    "premium95": {
      "p": 84.45,
      "r": 0
    }
  },
  "1667": {
    "diesel": {
      "p": 79.66,
      "r": 0
    },
    "unleaded": {
      "p": 81.45,
      "r": 0
    },
    "premium95": {
      "p": 84.45,
      "r": 0
    }
  },
  "1668": {
    "diesel": {
      "p": 79.66,
      "r": 0
    },
    "unleaded": {
      "p": 81.45,
      "r": 0
    },
    "premium95": {
      "p": 84.45,
      "r": 0
    }
  },
  "1669": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1670": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1671": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1672": {
    "diesel": {
      "p": 82.08,
      "r": 0
    },
    "unleaded": {
      "p": 82.52,
      "r": 0
    },
    "premium95": {
      "p": 83.02,
      "r": 0
    }
  },
  "1673": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1674": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1675": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1676": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1677": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1678": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1679": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1680": {
    "diesel": {
      "p": 78.57,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1681": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1682": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1683": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "1684": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "1685": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1686": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1687": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1688": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1689": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1690": {
    "diesel": {
      "p": 78.21,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.21,
      "r": 0
    },
    "unleaded": {
      "p": 76.8,
      "r": 0
    },
    "premium95": {
      "p": 77.8,
      "r": 0
    }
  },
  "1691": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.21,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1692": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.21,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1693": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.21,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1694": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.21,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1695": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1696": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "1697": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1698": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1699": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1700": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1701": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1702": {
    "diesel": {
      "p": 78,
      "r": 0
    },
    "unleaded": {
      "p": 74.6,
      "r": 0
    },
    "premium95": {
      "p": 75.1,
      "r": 0
    }
  },
  "1703": {
    "diesel": {
      "p": 78,
      "r": 0
    },
    "unleaded": {
      "p": 74.6,
      "r": 0
    },
    "premium95": {
      "p": 75.1,
      "r": 0
    }
  },
  "1704": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1705": {
    "diesel": {
      "p": 78.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    },
    "premium97": {
      "p": 88.3,
      "r": 0
    }
  },
  "1706": {
    "diesel": {
      "p": 78.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    },
    "premium97": {
      "p": 88.3,
      "r": 0
    }
  },
  "1707": {
    "diesel": {
      "p": 78.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    },
    "premium97": {
      "p": 88.3,
      "r": 0
    }
  },
  "1708": {
    "diesel": {
      "p": 78.96,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    },
    "premium97": {
      "p": 88.3,
      "r": 0
    }
  },
  "1709": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1710": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1711": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1712": {
    "diesel": {
      "p": 79.61,
      "r": 0
    },
    "unleaded": {
      "p": 85,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1713": {
    "diesel": {
      "p": 78.8,
      "r": 0
    },
    "premiumDiesel": {
      "p": 91.6,
      "r": 0
    },
    "unleaded": {
      "p": 81.8,
      "r": 0
    },
    "premium95": {
      "p": 92.5,
      "r": 0
    },
    "premium97": {
      "p": 96.9,
      "r": 0
    }
  },
  "1714": {
    "diesel": {
      "p": 78.06,
      "r": 0
    },
    "unleaded": {
      "p": 81.25,
      "r": 0
    },
    "premium95": {
      "p": 82.75,
      "r": 0
    }
  },
  "1715": {
    "diesel": {
      "p": 78.26,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.26,
      "r": 0
    },
    "unleaded": {
      "p": 79.1,
      "r": 0
    },
    "premium95": {
      "p": 80.1,
      "r": 0
    },
    "premium97": {
      "p": 90.1,
      "r": 0
    }
  },
  "1716": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1717": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1718": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1719": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1720": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1721": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1722": {
    "diesel": {
      "p": 74.99,
      "r": 0
    },
    "unleaded": {
      "p": 80.53,
      "r": 0
    },
    "premium95": {
      "p": 81.53,
      "r": 0
    }
  },
  "1723": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    },
    "premium97": {
      "p": 88.3,
      "r": 0
    }
  },
  "1724": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1725": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1726": {
    "diesel": {
      "p": 79.61,
      "r": 0
    },
    "unleaded": {
      "p": 85,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1727": {
    "diesel": {
      "p": 79.61,
      "r": 0
    },
    "unleaded": {
      "p": 85,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1728": {
    "diesel": {
      "p": 74.99,
      "r": 0
    },
    "unleaded": {
      "p": 80.53,
      "r": 0
    },
    "premium95": {
      "p": 81.53,
      "r": 0
    }
  },
  "1730": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1731": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    },
    "premium97": {
      "p": 88.3,
      "r": 0
    }
  },
  "1732": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1733": {
    "diesel": {
      "p": 80.58,
      "r": 0
    },
    "unleaded": {
      "p": 85.5,
      "r": 0
    },
    "premium95": {
      "p": 86,
      "r": 0
    }
  },
  "1734": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1735": {
    "diesel": {
      "p": 79.66,
      "r": 0
    },
    "unleaded": {
      "p": 81.45,
      "r": 0
    },
    "premium95": {
      "p": 84.45,
      "r": 0
    }
  },
  "1736": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1737": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1738": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1739": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.96,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    },
    "premium97": {
      "p": 88.3,
      "r": 0
    }
  },
  "1740": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1741": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1742": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1743": {
    "diesel": {
      "p": 79.2,
      "r": 0
    },
    "premiumDiesel": {
      "p": 81.1,
      "r": 0
    },
    "unleaded": {
      "p": 83,
      "r": 0
    },
    "premium95": {
      "p": 88.3,
      "r": 0
    }
  },
  "1744": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "premiumDiesel": {
      "p": 104.26,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1745": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1746": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1747": {
    "diesel": {
      "p": 78.6,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.55,
      "r": 0
    },
    "premium95": {
      "p": 77.82,
      "r": 0
    }
  },
  "1748": {
    "diesel": {
      "p": 78.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.55,
      "r": 0
    }
  },
  "1749": {
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1750": {
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1751": {
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1752": {
    "diesel": {
      "p": 78.6,
      "r": 0
    },
    "unleaded": {
      "p": 83.55,
      "r": 0
    }
  },
  "1753": {
    "diesel": {
      "p": 79.66,
      "r": 0
    },
    "unleaded": {
      "p": 81.45,
      "r": 0
    },
    "premium95": {
      "p": 84.45,
      "r": 0
    }
  },
  "1754": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1755": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1756": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1757": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1758": {
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "1760": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "1761": {
    "diesel": {
      "p": 78.66,
      "r": 0
    },
    "unleaded": {
      "p": 77.3,
      "r": 0
    },
    "premium95": {
      "p": 78.3,
      "r": 0
    }
  },
  "1762": {
    "diesel": {
      "p": 74.99,
      "r": 0
    },
    "unleaded": {
      "p": 80.53,
      "r": 0
    },
    "premium95": {
      "p": 81.53,
      "r": 0
    }
  },
  "1763": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1764": {
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1765": {
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1766": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1769": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1770": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1771": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1772": {
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1773": {
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1775": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1776": {
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1777": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1778": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1779": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1781": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1782": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1783": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1784": {
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1785": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1786": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1787": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1788": {
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1789": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1790": {
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1791": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1792": {
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1794": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1795": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1796": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1797": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1798": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1799": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1800": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1801": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1802": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1803": {
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1804": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1805": {
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1806": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1808": {
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1809": {
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1810": {
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1811": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1813": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1814": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1815": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1816": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1821": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1822": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1823": {
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1824": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1825": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1826": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1827": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1828": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1830": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1831": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1832": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1833": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1834": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1835": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1836": {
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1837": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1838": {
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1839": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1840": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1841": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1842": {
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1843": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1844": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1845": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1846": {
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1847": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1848": {
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1849": {
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1850": {
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1851": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1853": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1854": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1855": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1856": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1858": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1859": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1861": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1862": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1863": {
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1864": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1865": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1866": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1867": {
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1869": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1870": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1871": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1872": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1875": {
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1877": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1878": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1879": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1880": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1881": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1885": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1896": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1900": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1901": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1902": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1903": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1905": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1906": {
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "1907": {
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1908": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1909": {
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1910": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1913": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1914": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1916": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1917": {
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1918": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1919": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1921": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1922": {
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1923": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1924": {
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1925": {
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1926": {
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1927": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1928": {
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1930": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1931": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1933": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1934": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1935": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1936": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1937": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1938": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1939": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1940": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1941": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "1942": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1943": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1944": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1945": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1946": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1947": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1948": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1949": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1950": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1951": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1952": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1953": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1954": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1955": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1956": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1957": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1958": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1959": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1960": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "1961": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "1962": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1963": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1964": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1965": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "1966": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1967": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1968": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1969": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1972": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "1973": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1978": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1986": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "1987": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1988": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "1990": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "1991": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "1996": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "1998": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2000": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2001": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2002": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "2005": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2006": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "2008": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "2009": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2010": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "2011": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "2013": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2015": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2016": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "2019": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2020": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2021": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2022": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2023": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2024": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2025": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2026": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2037": {
    "diesel": {
      "p": 77.93,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.52,
      "r": 0,
      "e": 1
    }
  },
  "2038": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "2039": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2041": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2043": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2045": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2046": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2047": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2048": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2056": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2057": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2059": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2060": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2061": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2062": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2064": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2065": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2066": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2073": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2074": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2075": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2076": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2077": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2078": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2079": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2080": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2081": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2083": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2084": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "2085": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2087": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2088": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2091": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "2092": {
    "diesel": {
      "p": 80,
      "r": 0
    },
    "premiumDiesel": {
      "p": 86.3,
      "r": 0
    },
    "unleaded": {
      "p": 83.8,
      "r": 0
    },
    "premium95": {
      "p": 91.9,
      "r": 0
    },
    "premium97": {
      "p": 94.7,
      "r": 0
    }
  },
  "2093": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2094": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2095": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2097": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2098": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2099": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2100": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2101": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2102": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2104": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2106": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2107": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2108": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2109": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2110": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2111": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2112": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2113": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2115": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2116": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2117": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2118": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2119": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2120": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2121": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2122": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2123": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "2124": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2125": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2126": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2127": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2128": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "2130": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2131": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2132": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2133": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2134": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2135": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2136": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2137": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2138": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2139": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2141": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2142": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2143": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2144": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2145": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2147": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2148": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2149": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2150": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2151": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2152": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2153": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2154": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2155": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2156": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2157": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2158": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2159": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "2160": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2162": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2163": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2165": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2166": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2167": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2168": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2169": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2170": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2171": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2172": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2173": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2174": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2175": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2176": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2177": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2178": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2179": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2180": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2181": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2182": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2183": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2184": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2185": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2186": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2187": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2188": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2191": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2192": {
    "diesel": {
      "p": 77.1,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 78.73,
      "r": 0,
      "e": 1
    }
  },
  "2193": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2194": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2195": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2196": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "2197": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "2199": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2200": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2201": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2202": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2203": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "2204": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2209": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2210": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2211": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2213": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2214": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2215": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2216": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2217": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2219": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2220": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2222": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2223": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2224": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2226": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2227": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2228": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2229": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "2230": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2231": {
    "diesel": {
      "p": 77.81,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.07,
      "r": 0,
      "e": 1
    }
  },
  "2232": {
    "diesel": {
      "p": 80.76,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 80.53,
      "r": 0,
      "e": 1
    }
  },
  "2233": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2234": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "2235": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2236": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2239": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2240": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2241": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2242": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2243": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2244": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2245": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2247": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2248": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2249": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2250": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2251": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2252": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2253": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2254": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2255": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2256": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2257": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2258": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2260": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2261": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2262": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2263": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2264": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2265": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2266": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2267": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2270": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2271": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2272": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2273": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2274": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2275": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2276": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2277": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2279": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2280": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2281": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2282": {
    "diesel": {
      "p": 75.27,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 76.42,
      "r": 0,
      "e": 1
    }
  },
  "2283": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2284": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2285": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "2287": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2288": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  },
  "2289": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2290": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2291": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2292": {
    "diesel": {
      "p": 78.87,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 81.83,
      "r": 0,
      "e": 1
    }
  },
  "2293": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2294": {
    "diesel": {
      "p": 77.01,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 77.11,
      "r": 0,
      "e": 1
    }
  },
  "2298": {
    "diesel": {
      "p": 78.2,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 79.62,
      "r": 0,
      "e": 1
    }
  },
  "2300": {
    "diesel": {
      "p": 79.32,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 82.09,
      "r": 0,
      "e": 1
    }
  },
  "2301": {
    "diesel": {
      "p": 79.73,
      "r": 0,
      "e": 1
    },
    "unleaded": {
      "p": 83.48,
      "r": 0,
      "e": 1
    }
  }
};
