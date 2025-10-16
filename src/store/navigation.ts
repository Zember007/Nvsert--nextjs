import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { log } from 'console';



export interface NavigationItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  duration: string;
  price: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documents: any[];
  img: any;
  category: any;
  content?: ContentBlock[];
}

export interface ContentBlock {
  id: number;
  order: number;
  blockType: string;
  heading: string;
  headingLevel: string;
  text?: string | null;
  richText?: string;
  imageCaption?: string;
  image?: Image;

}

export interface Image {
  id: number;
  name: string;
  formats: {
    thumbnail: ImageTypeFormat;
    small: ImageTypeFormat;
    medium: ImageTypeFormat;
  }
}


export interface ImageTypeFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}


export interface Services {
  items: NavigationItem[];
  id: number;
  name: string;
  title: string;
  description: string;
}



interface NavigationState {
  navigation: NavigationItem[];
  services: Services[];
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
      const response = await axios.get(`/api/services`);
      const data: NavigationItem[] = response.data.data
      const sortedData = data.sort(
        (a, b) => (a?.category?.order || 0) - (b?.category?.order || 0)
      );

      return sortedData
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

        const services = action.payload.reduce<Services[]>((acc, item) => {
          const catId = item.category.id;
          let accFind = acc.find(entry => entry.id === catId);
          if (!accFind) {
            accFind = {
              id: item.category.id,
              name: item.category.name,
              title: item.category.title,
              description: item.category.description,
              items: []
            };
            acc.push(accFind);
          }
          accFind.items.push(item);
          return acc;
        }, []);

        state.services = services;

        state.status = 'succeeded';
      })
      .addCase(updateActionNavigation.pending, (state) => {
        state.navigation = []
        state.status = 'loading';
      })
      .addCase(updateActionNavigation.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch navigation';
        state.navigation = []
        state.status = 'failed';
      })

  },
});

export default navigationSlice.reducer;