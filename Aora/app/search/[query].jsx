import { View, Text, FlatList,Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'

import { images } from '../../constants'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts, searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/UseAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const {query} = useLocalSearchParams();
  const {data: posts, refetch} = useAppwrite(() => searchPosts(query));
  

  useEffect(() =>{
    refetch()
  }, [query])

  console.log(posts);


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) =>(
          <VideoCard video={item}/>
         
        )}

        ListHeaderComponent={() =>(
          <View className="my-6 px-4 ">
         
  
           <Text className="font-pmedium text-sm 
                text-gray-100">
                  Search Results
                </Text>
                <Text className="text-2xl font-semibold
                text-white">
                  {query}
                </Text>
                <View className="mt-6 mb-8 ">
                <SearchInput initalQuery={query}/>
                </View>
            
              </View>

      

             
           

   

           
        )}

        ListEmptyComponent={() =>(
         <EmptyState
           title="No Videos Found"
           subtitle="No videos found for this search term"
         />
        )}
       
     
      />
    </SafeAreaView>
  )
}

export default Search