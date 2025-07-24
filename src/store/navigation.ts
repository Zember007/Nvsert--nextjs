import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface NavigationItem {
  id?: number
  title: string;
  full_slug: string;
  slug?: string;
  article_preview?: string;
  children: NavigationItem[];
  seo_h1?: string;
  short_text?: string;
}

interface NavigationState {
  navigation: NavigationItem[];
  services: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const updateActionNavigation = createAsyncThunk<
  NavigationItem[],
  string | undefined,
  { rejectValue: string }
>(
  'navigation/updateNavigation',
  async (ordering = '', { rejectWithValue }) => {
    try {
      /* const response = await axios.get(`/api/sections/tree?ordering=${ordering}`); */
      return [
        {
            "id": 131,
            "seo_h1": "gostR",
            "title": "gostR",
            "short_text": "",
            "slug": "gost-r",
            "full_slug": "gost-r",
            "article_preview": "",
            "children": [
                {
                    "id": 112,
                    "seo_h1": "gostR1",
                    "title": "gostR1",
                    "short_text": "",
                    "slug": "sertifikat-sootvetstviya-gost-r",
                    "full_slug": "gost-r/sertifikat-sootvetstviya-gost-r",
                    "article_preview": "gost-r/sertifikat-sootvetstviya-gost-r/dobrovolnyi-sertifikat-sootvetstviia-gost-r",
                    "children": []
                },
                {
                    "id": 16,
                    "seo_h1": "gostR2",
                    "title": "gostR2",
                    "short_text": "",
                    "slug": "deklaraciya-sootvetstviya-gost-r",
                    "full_slug": "gost-r/deklaraciya-sootvetstviya-gost-r",
                    "article_preview": "gost-r/deklaraciya-sootvetstviya-gost-r/deklaratsiia-sootvetstviia-gost-r",
                    "children": []
                },
                {
                    "id": 43,
                    "seo_h1": "gostR3",
                    "title": "gostR3",
                    "short_text": "",
                    "slug": "sertifikat-sootvetstviya-seysmostoykosti",
                    "full_slug": "gost-r/sertifikat-sootvetstviya-seysmostoykosti",
                    "article_preview": "gost-r/sertifikat-sootvetstviya-seysmostoykosti/seismostoikost-2",
                    "children": []
                }
            ]
        },
        {
            "id": 9,
            "seo_h1": "tamozhennySoyuz",
            "title": "tamozhennySoyuz",
            "short_text": "",
            "slug": "tamozhennogo-soyuza",
            "full_slug": "tamozhennogo-soyuza",
            "article_preview": "",
            "children": [
                {
                    "id": 113,
                    "seo_h1": "tamozhennySoyuz1",
                    "title": "tamozhennySoyuz1",
                    "short_text": "",
                    "slug": "sertifikat-tamozhennogo-soyuza-ss-tr-ts",
                    "full_slug": "tamozhennogo-soyuza/sertifikat-tamozhennogo-soyuza-ss-tr-ts",
                    "article_preview": "tamozhennogo-soyuza/sertifikat-tamozhennogo-soyuza-ss-tr-ts/sertifikat-sootvetstviia-tamozhennogo-soiuza",
                    "children": []
                },
                {
                    "id": 132,
                    "seo_h1": "tamozhennySoyuz2",
                    "title": "tamozhennySoyuz2",
                    "short_text": "",
                    "slug": "prohozhdenie-inspekcionnogo-kontrolya-ik",
                    "full_slug": "tamozhennogo-soyuza/prohozhdenie-inspekcionnogo-kontrolya-ik",
                    "article_preview": "",
                    "children": []
                },
                {
                    "id": 114,
                    "seo_h1": "tamozhennySoyuz3",
                    "title": "tamozhennySoyuz3",
                    "short_text": "",
                    "slug": "deklaraciya-tamozhennogo-soyuza-ds-tr-ts",
                    "full_slug": "tamozhennogo-soyuza/deklaraciya-tamozhennogo-soyuza-ds-tr-ts",
                    "article_preview": "tamozhennogo-soyuza/deklaraciya-tamozhennogo-soyuza-ds-tr-ts/deklaratsiia-sootvetstviia-tamozhennogo-soiuza",
                    "children": []
                },
                {
                    "id": 62,
                    "seo_h1": "tamozhennySoyuz4",
                    "title": "tamozhennySoyuz4",
                    "short_text": "",
                    "slug": "sertifikat-sootvetstviya-pozharnoy-bezopasnosti",
                    "full_slug": "tamozhennogo-soyuza/sertifikat-sootvetstviya-pozharnoy-bezopasnosti",
                    "article_preview": "tamozhennogo-soyuza/sertifikat-sootvetstviya-pozharnoy-bezopasnosti/pozharnyi-sertifikat-1",
                    "children": []
                }
            ]
        },
        {
            "id": 11,
            "seo_h1": "rospotrebnadzor",
            "title": "rospotrebnadzor",
            "short_text": "",
            "slug": "rospotrebnadzor",
            "full_slug": "rospotrebnadzor",
            "article_preview": "",
            "children": [
                {
                    "id": 66,
                    "seo_h1": "rospotrebnadzor1",
                    "title": "rospotrebnadzor1",
                    "short_text": "",
                    "slug": "svidetelstvo-o-gosudarstvennoy-registracii-sgr",
                    "full_slug": "rospotrebnadzor/svidetelstvo-o-gosudarstvennoy-registracii-sgr",
                    "article_preview": "rospotrebnadzor/svidetelstvo-o-gosudarstvennoy-registracii-sgr/svidetelstvo-o-gos-registratsii",
                    "children": []
                },
                {
                    "id": 74,
                    "seo_h1": "rospotrebnadzor2",
                    "title": "rospotrebnadzor2",
                    "short_text": "",
                    "slug": "ekspertnoe-zaklyuchenie-ez",
                    "full_slug": "rospotrebnadzor/ekspertnoe-zaklyuchenie-ez",
                    "article_preview": "rospotrebnadzor/ekspertnoe-zaklyuchenie-ez/ekspertnoe-zakliuchenie",
                    "children": []
                }
            ]
        },
        {
            "id": 111,
            "seo_h1": "iso",
            "title": "iso",
            "short_text": "",
            "slug": "iso",
            "full_slug": "iso",
            "article_preview": "",
            "children": [
                {
                    "id": 17,
                    "seo_h1": "iso1",
                    "title": "iso1",
                    "short_text": "",
                    "slug": "gost-r-iso-90012015-standart-organizacii",
                    "full_slug": "iso/gost-r-iso-90012015-standart-organizacii",
                    "article_preview": "iso/gost-r-iso-90012015-standart-organizacii/gost-iso-9001-2011-1",
                    "children": []
                },
                {
                    "id": 18,
                    "seo_h1": "iso2",
                    "title": "iso2",
                    "short_text": "",
                    "slug": "gost-r-iso-140012016-ekologicheskiy-menedzhment",
                    "full_slug": "iso/gost-r-iso-140012016-ekologicheskiy-menedzhment",
                    "article_preview": "iso/gost-r-iso-140012016-ekologicheskiy-menedzhment/gost-r-iso-14001-2007-ekologiia",
                    "children": []
                },
                {
                    "id": 20,
                    "seo_h1": "iso3",
                    "title": "iso3",
                    "short_text": "",
                    "slug": "gost-r-iso-220002007-pishchevoy-menedzhment",
                    "full_slug": "iso/gost-r-iso-220002007-pishchevoy-menedzhment",
                    "article_preview": "iso/gost-r-iso-220002007-pishchevoy-menedzhment/gost-r-iso-22000-2007-iso-220002005",
                    "children": []
                }
            ]
        },
        {
            "id": 104,
            "seo_h1": "tekhDokumentatsiya",
            "title": "tekhDokumentatsiya",
            "short_text": "",
            "slug": "tehnicheskaya-dokumentatsiya",
            "full_slug": "tehnicheskaya-dokumentatsiya",
            "article_preview": "",
            "children": [
                {
                    "id": 133,
                    "seo_h1": "tekhDokumentatsiya1",
                    "title": "tekhDokumentatsiya1",
                    "short_text": "",
                    "slug": "protokol-ispytaniy-issledovaniy-pi",
                    "full_slug": "tehnicheskaya-dokumentatsiya/protokol-ispytaniy-issledovaniy-pi",
                    "article_preview": "",
                    "children": []
                },
                {
                    "id": 107,
                    "seo_h1": "tekhDokumentatsiya2",
                    "title": "tekhDokumentatsiya2",
                    "short_text": "",
                    "slug": "tehnicheskie-usloviya-tu",
                    "full_slug": "tehnicheskaya-dokumentatsiya/tehnicheskie-usloviya-tu",
                    "article_preview": "tehnicheskaya-dokumentatsiya/tehnicheskie-usloviya-tu/tekhnicheskie-usloviia",
                    "children": []
                }
            ]
        },
        {
            "id": 14,
            "seo_h1": "sertifikatsiya",
            "title": "sertifikatsiya",
            "short_text": "",
            "slug": "sertifikaciya",
            "full_slug": "sertifikaciya",
            "article_preview": "",
            "children": [
                {
                    "id": 134,
                    "seo_h1": "sertifikatsiya1",
                    "title": "sertifikatsiya1",
                    "short_text": "",
                    "slug": "sertifikat-na-tip-produkcii",
                    "full_slug": "sertifikaciya/sertifikat-na-tip-produkcii",
                    "article_preview": "",
                    "children": []
                },
                {
                    "id": 127,
                    "seo_h1": "sertifikatsiya2",
                    "title": "sertifikatsiya2",
                    "short_text": "",
                    "slug": "informacionnoe-otkaznoe-pismo",
                    "full_slug": "sertifikaciya/informacionnoe-otkaznoe-pismo",
                    "article_preview": "sertifikaciya/informacionnoe-otkaznoe-pismo/otkaznoe-pismo",
                    "children": []
                },
                {
                    "id": 135,
                    "seo_h1": "sertifikatsiya3",
                    "title": "sertifikatsiya3",
                    "short_text": "",
                    "slug": "pasport-bezopasnosti-himicheskoy-produkcii",
                    "full_slug": "sertifikaciya/pasport-bezopasnosti-himicheskoy-produkcii",
                    "article_preview": "",
                    "children": []
                },
                {
                    "id": 136,
                    "seo_h1": "sertifikatsiya4",
                    "title": "sertifikatsiya4",
                    "short_text": "",
                    "slug": "sertifikat-o-proishozhdenii-tovara-st-1",
                    "full_slug": "sertifikaciya/sertifikat-o-proishozhdenii-tovara-st-1",
                    "article_preview": "",
                    "children": []
                }
            ]
        }
    ]
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateActionServices = createAsyncThunk<
  any[],
  string,
  { rejectValue: string }
>(
  'services/updateServices',
  async (ordering = '', { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/section-services?ordering=${ordering}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState: NavigationState = {
  navigation: [],
  services: [],
  status: 'idle',
  error: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateActionNavigation.fulfilled, (state, action: PayloadAction<NavigationItem[]>) => {
        state.navigation = action.payload;
       
        state.status = 'succeeded';
      })
      .addCase(updateActionNavigation.pending, (state) => {
        state.navigation = [
          {
              "id": 131,
              "seo_h1": "gostR",
              "title": "gostR",
              "short_text": "",
              "slug": "gost-r",
              "full_slug": "gost-r",
              "article_preview": "",
              "children": [
                  {
                      "id": 112,
                      "seo_h1": "gostR1",
                      "title": "gostR1",
                      "short_text": "",
                      "slug": "sertifikat-sootvetstviya-gost-r",
                      "full_slug": "gost-r/sertifikat-sootvetstviya-gost-r",
                      "article_preview": "gost-r/sertifikat-sootvetstviya-gost-r/dobrovolnyi-sertifikat-sootvetstviia-gost-r",
                      "children": []
                  },
                  {
                      "id": 16,
                      "seo_h1": "gostR2",
                      "title": "gostR2",
                      "short_text": "",
                      "slug": "deklaraciya-sootvetstviya-gost-r",
                      "full_slug": "gost-r/deklaraciya-sootvetstviya-gost-r",
                      "article_preview": "gost-r/deklaraciya-sootvetstviya-gost-r/deklaratsiia-sootvetstviia-gost-r",
                      "children": []
                  },
                  {
                      "id": 43,
                      "seo_h1": "gostR3",
                      "title": "gostR3",
                      "short_text": "",
                      "slug": "sertifikat-sootvetstviya-seysmostoykosti",
                      "full_slug": "gost-r/sertifikat-sootvetstviya-seysmostoykosti",
                      "article_preview": "gost-r/sertifikat-sootvetstviya-seysmostoykosti/seismostoikost-2",
                      "children": []
                  }
              ]
          },
          {
              "id": 9,
              "seo_h1": "tamozhennySoyuz",
              "title": "tamozhennySoyuz",
              "short_text": "",
              "slug": "tamozhennogo-soyuza",
              "full_slug": "tamozhennogo-soyuza",
              "article_preview": "",
              "children": [
                  {
                      "id": 113,
                      "seo_h1": "tamozhennySoyuz1",
                      "title": "tamozhennySoyuz1",
                      "short_text": "",
                      "slug": "sertifikat-tamozhennogo-soyuza-ss-tr-ts",
                      "full_slug": "tamozhennogo-soyuza/sertifikat-tamozhennogo-soyuza-ss-tr-ts",
                      "article_preview": "tamozhennogo-soyuza/sertifikat-tamozhennogo-soyuza-ss-tr-ts/sertifikat-sootvetstviia-tamozhennogo-soiuza",
                      "children": []
                  },
                  {
                      "id": 132,
                      "seo_h1": "tamozhennySoyuz2",
                      "title": "tamozhennySoyuz2",
                      "short_text": "",
                      "slug": "prohozhdenie-inspekcionnogo-kontrolya-ik",
                      "full_slug": "tamozhennogo-soyuza/prohozhdenie-inspekcionnogo-kontrolya-ik",
                      "article_preview": "",
                      "children": []
                  },
                  {
                      "id": 114,
                      "seo_h1": "tamozhennySoyuz3",
                      "title": "tamozhennySoyuz3",
                      "short_text": "",
                      "slug": "deklaraciya-tamozhennogo-soyuza-ds-tr-ts",
                      "full_slug": "tamozhennogo-soyuza/deklaraciya-tamozhennogo-soyuza-ds-tr-ts",
                      "article_preview": "tamozhennogo-soyuza/deklaraciya-tamozhennogo-soyuza-ds-tr-ts/deklaratsiia-sootvetstviia-tamozhennogo-soiuza",
                      "children": []
                  },
                  {
                      "id": 62,
                      "seo_h1": "tamozhennySoyuz4",
                      "title": "tamozhennySoyuz4",
                      "short_text": "",
                      "slug": "sertifikat-sootvetstviya-pozharnoy-bezopasnosti",
                      "full_slug": "tamozhennogo-soyuza/sertifikat-sootvetstviya-pozharnoy-bezopasnosti",
                      "article_preview": "tamozhennogo-soyuza/sertifikat-sootvetstviya-pozharnoy-bezopasnosti/pozharnyi-sertifikat-1",
                      "children": []
                  }
              ]
          },
          {
              "id": 11,
              "seo_h1": "rospotrebnadzor",
              "title": "rospotrebnadzor",
              "short_text": "",
              "slug": "rospotrebnadzor",
              "full_slug": "rospotrebnadzor",
              "article_preview": "",
              "children": [
                  {
                      "id": 66,
                      "seo_h1": "rospotrebnadzor1",
                      "title": "rospotrebnadzor1",
                      "short_text": "",
                      "slug": "svidetelstvo-o-gosudarstvennoy-registracii-sgr",
                      "full_slug": "rospotrebnadzor/svidetelstvo-o-gosudarstvennoy-registracii-sgr",
                      "article_preview": "rospotrebnadzor/svidetelstvo-o-gosudarstvennoy-registracii-sgr/svidetelstvo-o-gos-registratsii",
                      "children": []
                  },
                  {
                      "id": 74,
                      "seo_h1": "rospotrebnadzor2",
                      "title": "rospotrebnadzor2",
                      "short_text": "",
                      "slug": "ekspertnoe-zaklyuchenie-ez",
                      "full_slug": "rospotrebnadzor/ekspertnoe-zaklyuchenie-ez",
                      "article_preview": "rospotrebnadzor/ekspertnoe-zaklyuchenie-ez/ekspertnoe-zakliuchenie",
                      "children": []
                  }
              ]
          },
          {
              "id": 111,
              "seo_h1": "iso",
              "title": "iso",
              "short_text": "",
              "slug": "iso",
              "full_slug": "iso",
              "article_preview": "",
              "children": [
                  {
                      "id": 17,
                      "seo_h1": "iso1",
                      "title": "iso1",
                      "short_text": "",
                      "slug": "gost-r-iso-90012015-standart-organizacii",
                      "full_slug": "iso/gost-r-iso-90012015-standart-organizacii",
                      "article_preview": "iso/gost-r-iso-90012015-standart-organizacii/gost-iso-9001-2011-1",
                      "children": []
                  },
                  {
                      "id": 18,
                      "seo_h1": "iso2",
                      "title": "iso2",
                      "short_text": "",
                      "slug": "gost-r-iso-140012016-ekologicheskiy-menedzhment",
                      "full_slug": "iso/gost-r-iso-140012016-ekologicheskiy-menedzhment",
                      "article_preview": "iso/gost-r-iso-140012016-ekologicheskiy-menedzhment/gost-r-iso-14001-2007-ekologiia",
                      "children": []
                  },
                  {
                      "id": 20,
                      "seo_h1": "iso3",
                      "title": "iso3",
                      "short_text": "",
                      "slug": "gost-r-iso-220002007-pishchevoy-menedzhment",
                      "full_slug": "iso/gost-r-iso-220002007-pishchevoy-menedzhment",
                      "article_preview": "iso/gost-r-iso-220002007-pishchevoy-menedzhment/gost-r-iso-22000-2007-iso-220002005",
                      "children": []
                  }
              ]
          },
          {
              "id": 104,
              "seo_h1": "tekhDokumentatsiya",
              "title": "tekhDokumentatsiya",
              "short_text": "",
              "slug": "tehnicheskaya-dokumentatsiya",
              "full_slug": "tehnicheskaya-dokumentatsiya",
              "article_preview": "",
              "children": [
                  {
                      "id": 133,
                      "seo_h1": "tekhDokumentatsiya1",
                      "title": "tekhDokumentatsiya1",
                      "short_text": "",
                      "slug": "protokol-ispytaniy-issledovaniy-pi",
                      "full_slug": "tehnicheskaya-dokumentatsiya/protokol-ispytaniy-issledovaniy-pi",
                      "article_preview": "",
                      "children": []
                  },
                  {
                      "id": 107,
                      "seo_h1": "tekhDokumentatsiya2",
                      "title": "tekhDokumentatsiya2",
                      "short_text": "",
                      "slug": "tehnicheskie-usloviya-tu",
                      "full_slug": "tehnicheskaya-dokumentatsiya/tehnicheskie-usloviya-tu",
                      "article_preview": "tehnicheskaya-dokumentatsiya/tehnicheskie-usloviya-tu/tekhnicheskie-usloviia",
                      "children": []
                  }
              ]
          },
          {
              "id": 14,
              "seo_h1": "sertifikatsiya",
              "title": "sertifikatsiya",
              "short_text": "",
              "slug": "sertifikaciya",
              "full_slug": "sertifikaciya",
              "article_preview": "",
              "children": [
                  {
                      "id": 134,
                      "seo_h1": "sertifikatsiya1",
                      "title": "sertifikatsiya1",
                      "short_text": "",
                      "slug": "sertifikat-na-tip-produkcii",
                      "full_slug": "sertifikaciya/sertifikat-na-tip-produkcii",
                      "article_preview": "",
                      "children": []
                  },
                  {
                      "id": 127,
                      "seo_h1": "sertifikatsiya2",
                      "title": "sertifikatsiya2",
                      "short_text": "",
                      "slug": "informacionnoe-otkaznoe-pismo",
                      "full_slug": "sertifikaciya/informacionnoe-otkaznoe-pismo",
                      "article_preview": "sertifikaciya/informacionnoe-otkaznoe-pismo/otkaznoe-pismo",
                      "children": []
                  },
                  {
                      "id": 135,
                      "seo_h1": "sertifikatsiya3",
                      "title": "sertifikatsiya3",
                      "short_text": "",
                      "slug": "pasport-bezopasnosti-himicheskoy-produkcii",
                      "full_slug": "sertifikaciya/pasport-bezopasnosti-himicheskoy-produkcii",
                      "article_preview": "",
                      "children": []
                  },
                  {
                      "id": 136,
                      "seo_h1": "sertifikatsiya4",
                      "title": "sertifikatsiya4",
                      "short_text": "",
                      "slug": "sertifikat-o-proishozhdenii-tovara-st-1",
                      "full_slug": "sertifikaciya/sertifikat-o-proishozhdenii-tovara-st-1",
                      "article_preview": "",
                      "children": []
                  }
              ]
          }
      ]
        state.status = 'loading';
      })
      .addCase(updateActionNavigation.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch navigation';
        state.navigation = [
          {
            "id": 131,
            "seo_h1": "gostR",
            "title": "gostR",
            "short_text": "",
            "slug": "gost-r",
            "full_slug": "gost-r",
            "article_preview": "",
            "children": [
              {
                "id": 112,
                "seo_h1": "gostR1",
                "title": "gostR1",
                "short_text": "",
                "slug": "sertifikat-sootvetstviya-gost-r",
                "full_slug": "gost-r/sertifikat-sootvetstviya-gost-r",
                "article_preview": "gost-r/sertifikat-sootvetstviya-gost-r/dobrovolnyi-sertifikat-sootvetstviia-gost-r",
                "children": []
              },
              {
                "id": 16,
                "seo_h1": "gostR2",
                "title": "gostR2",
                "short_text": "",
                "slug": "deklaraciya-sootvetstviya-gost-r",
                "full_slug": "gost-r/deklaraciya-sootvetstviya-gost-r",
                "article_preview": "gost-r/deklaraciya-sootvetstviya-gost-r/deklaratsiia-sootvetstviia-gost-r",
                "children": []
              },
              {
                "id": 43,
                "seo_h1": "gostR3",
                "title": "gostR3",
                "short_text": "",
                "slug": "sertifikat-sootvetstviya-seysmostoykosti",
                "full_slug": "gost-r/sertifikat-sootvetstviya-seysmostoykosti",
                "article_preview": "gost-r/sertifikat-sootvetstviya-seysmostoykosti/seismostoikost-2",
                "children": []
              }
            ]
          },
          {
            "id": 9,
            "seo_h1": "tamozhennySoyuz",
            "title": "tamozhennySoyuz",
            "short_text": "",
            "slug": "tamozhennogo-soyuza",
            "full_slug": "tamozhennogo-soyuza",
            "article_preview": "",
            "children": [
              {
                "id": 113,
                "seo_h1": "tamozhennySoyuz1",
                "title": "tamozhennySoyuz1",
                "short_text": "",
                "slug": "sertifikat-tamozhennogo-soyuza-ss-tr-ts",
                "full_slug": "tamozhennogo-soyuza/sertifikat-tamozhennogo-soyuza-ss-tr-ts",
                "article_preview": "tamozhennogo-soyuza/sertifikat-tamozhennogo-soyuza-ss-tr-ts/sertifikat-sootvetstviia-tamozhennogo-soiuza",
                "children": []
              },
              {
                "id": 132,
                "seo_h1": "tamozhennySoyuz2",
                "title": "tamozhennySoyuz2",
                "short_text": "",
                "slug": "prohozhdenie-inspekcionnogo-kontrolya-ik",
                "full_slug": "tamozhennogo-soyuza/prohozhdenie-inspekcionnogo-kontrolya-ik",
                "article_preview": "",
                "children": []
              },
              {
                "id": 114,
                "seo_h1": "tamozhennySoyuz3",
                "title": "tamozhennySoyuz3",
                "short_text": "",
                "slug": "deklaraciya-tamozhennogo-soyuza-ds-tr-ts",
                "full_slug": "tamozhennogo-soyuza/deklaraciya-tamozhennogo-soyuza-ds-tr-ts",
                "article_preview": "tamozhennogo-soyuza/deklaraciya-tamozhennogo-soyuza-ds-tr-ts/deklaratsiia-sootvetstviia-tamozhennogo-soiuza",
                "children": []
              },
              {
                "id": 62,
                "seo_h1": "tamozhennySoyuz4",
                "title": "tamozhennySoyuz4",
                "short_text": "",
                "slug": "sertifikat-sootvetstviya-pozharnoy-bezopasnosti",
                "full_slug": "tamozhennogo-soyuza/sertifikat-sootvetstviya-pozharnoy-bezopasnosti",
                "article_preview": "tamozhennogo-soyuza/sertifikat-sootvetstviya-pozharnoy-bezopasnosti/pozharnyi-sertifikat-1",
                "children": []
              }
            ]
          },
          {
            "id": 11,
            "seo_h1": "Роспотребнадзор",
            "title": "Роспотребнадзор",
            "short_text": "",
            "slug": "rospotrebnadzor",
            "full_slug": "rospotrebnadzor",
            "article_preview": "",
            "children": [
              {
                "id": 66,
                "seo_h1": "Свидетельство о государственной регистрации (СГР)",
                "title": "Свидетельство о государственной регистрации (СГР)",
                "short_text": "",
                "slug": "svidetelstvo-o-gosudarstvennoy-registracii-sgr",
                "full_slug": "rospotrebnadzor/svidetelstvo-o-gosudarstvennoy-registracii-sgr",
                "article_preview": "rospotrebnadzor/svidetelstvo-o-gosudarstvennoy-registracii-sgr/svidetelstvo-o-gos-registratsii",
                "children": []
              },
              {
                "id": 74,
                "seo_h1": "Экспертное заключение (ЭЗ)",
                "title": "Экспертное заключение (ЭЗ)",
                "short_text": "",
                "slug": "ekspertnoe-zaklyuchenie-ez",
                "full_slug": "rospotrebnadzor/ekspertnoe-zaklyuchenie-ez",
                "article_preview": "rospotrebnadzor/ekspertnoe-zaklyuchenie-ez/ekspertnoe-zakliuchenie",
                "children": []
              }
            ]
          },
          {
            "id": 111,
            "seo_h1": "ИСО (СМК)",
            "title": "ИСО (СМК)",
            "short_text": "",
            "slug": "iso",
            "full_slug": "iso",
            "article_preview": "",
            "children": [
              {
                "id": 17,
                "seo_h1": "ГОСТ Р ИСО 9001–2015 (Стандарт организации)",
                "title": "ГОСТ Р ИСО 9001–2015 (Стандарт организации)",
                "short_text": "",
                "slug": "gost-r-iso-90012015-standart-organizacii",
                "full_slug": "iso/gost-r-iso-90012015-standart-organizacii",
                "article_preview": "iso/gost-r-iso-90012015-standart-organizacii/gost-iso-9001-2011-1",
                "children": []
              },
              {
                "id": 18,
                "seo_h1": "ГОСТ Р ИСО 14001-2016 (Экологический менеджмент)",
                "title": "ГОСТ Р ИСО 14001-2016 (Экологический менеджмент)",
                "short_text": "",
                "slug": "gost-r-iso-140012016-ekologicheskiy-menedzhment",
                "full_slug": "iso/gost-r-iso-140012016-ekologicheskiy-menedzhment",
                "article_preview": "iso/gost-r-iso-140012016-ekologicheskiy-menedzhment/gost-r-iso-14001-2007-ekologiia",
                "children": []
              },
              {
                "id": 20,
                "seo_h1": "ГОСТ Р ИСО 22000-2007 (Пищевой менеджмент)",
                "title": "ГОСТ Р ИСО 22000-2007 (Пищевой менеджмент)",
                "short_text": "",
                "slug": "gost-r-iso-220002007-pishchevoy-menedzhment",
                "full_slug": "iso/gost-r-iso-220002007-pishchevoy-menedzhment",
                "article_preview": "iso/gost-r-iso-220002007-pishchevoy-menedzhment/gost-r-iso-22000-2007-iso-220002005",
                "children": []
              }
            ]
          },
          {
            "id": 104,
            "seo_h1": "Техническая документация",
            "title": "Техническая документация",
            "short_text": "",
            "slug": "tehnicheskaya-dokumentatsiya",
            "full_slug": "tehnicheskaya-dokumentatsiya",
            "article_preview": "",
            "children": [
              {
                "id": 133,
                "seo_h1": "Протокол испытаний (исследований) ПИ",
                "title": "Протокол испытаний (исследований) ПИ",
                "short_text": "",
                "slug": "protokol-ispytaniy-issledovaniy-pi",
                "full_slug": "tehnicheskaya-dokumentatsiya/protokol-ispytaniy-issledovaniy-pi",
                "article_preview": "",
                "children": []
              },
              {
                "id": 107,
                "seo_h1": "Технические условия (ТУ)",
                "title": "Технические условия (ТУ)",
                "short_text": "",
                "slug": "tehnicheskie-usloviya-tu",
                "full_slug": "tehnicheskaya-dokumentatsiya/tehnicheskie-usloviya-tu",
                "article_preview": "tehnicheskaya-dokumentatsiya/tehnicheskie-usloviya-tu/tekhnicheskie-usloviia",
                "children": []
              }
            ]
          },
          {
            "id": 14,
            "seo_h1": "Сертификация",
            "title": "Сертификация",
            "short_text": "",
            "slug": "sertifikaciya",
            "full_slug": "sertifikaciya",
            "article_preview": "",
            "children": [
              {
                "id": 134,
                "seo_h1": "Сертификат на тип продукции",
                "title": "Сертификат на тип продукции",
                "short_text": "",
                "slug": "sertifikat-na-tip-produkcii",
                "full_slug": "sertifikaciya/sertifikat-na-tip-produkcii",
                "article_preview": "",
                "children": []
              },
              {
                "id": 127,
                "seo_h1": "Информационное отказное письмо",
                "title": "Информационное отказное письмо",
                "short_text": "",
                "slug": "informacionnoe-otkaznoe-pismo",
                "full_slug": "sertifikaciya/informacionnoe-otkaznoe-pismo",
                "article_preview": "other-services/informacionnoe-otkaznoe-pismo/otkaznoe-pismo",
                "children": []
              },
              {
                "id": 135,
                "seo_h1": "Паспорт безопасности химической продукции",
                "title": "Паспорт безопасности химической продукции",
                "short_text": "",
                "slug": "pasport-bezopasnosti-himicheskoy-produkcii",
                "full_slug": "sertifikaciya/pasport-bezopasnosti-himicheskoy-produkcii",
                "article_preview": "",
                "children": []
              },
              {
                "id": 136,
                "seo_h1": "Сертификат о происхождении товара (СТ-1)",
                "title": "Сертификат о происхождении товара (СТ-1)",
                "short_text": "",
                "slug": "sertifikat-o-proishozhdenii-tovara-st-1",
                "full_slug": "sertifikaciya/sertifikat-o-proishozhdenii-tovara-st-1",
                "article_preview": "",
                "children": []
              }
            ]
          }
        ]
        state.status = 'failed';
      })
      .addCase(updateActionServices.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.services = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateActionServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActionServices.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch services';
        state.status = 'failed';
      });
  },
});

export default navigationSlice.reducer;