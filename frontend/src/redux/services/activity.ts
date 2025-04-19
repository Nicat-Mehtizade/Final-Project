import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Activity } from '../../types/activityType';
export const activityApi = createApi({
  reducerPath: 'activityApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }), 
  tagTypes: ['Activity'],
  endpoints: (builder) => ({
    getActivities: builder.query<Activity[], { genre?: string }>({
        query: () => 'activity',
        transformResponse: (response: {data:Activity[]}, meta, arg) => {
          if (arg?.genre) {
            return response.data.filter((activity: Activity) => activity.genre === arg.genre);
          }
          return response.data;
        },
        providesTags: ['Activity'],
      }),

    getActivityById: builder.query<Activity, string>({
      query: (id) => `activities/${id}`,
      providesTags: (result, error, id) => [{ type: 'Activity', id }],
    }),

    createActivity: builder.mutation<Activity, FormData>({
      query: (newActivity) => ({
        url: 'activities',
        method: 'POST',
        body: newActivity,
      }),
      invalidatesTags: ['Activity'],
    }),

    updateActivity: builder.mutation<Activity, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `activities/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Activity', id }],
    }),

    deleteActivity: builder.mutation<void, string>({
      query: (id) => ({
        url: `activities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Activity'],
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useGetActivityByIdQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} = activityApi;
