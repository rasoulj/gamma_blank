import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventLists from '../../organisms/Event/EventLists'

const EventManagement = () => {
  return (
    <EventLists hasManagement={true}/>
  )
}

export default EventManagement

const styles = StyleSheet.create({})