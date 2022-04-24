import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
var check = [];
var count = 0;

const listtab = [
  {
    status: "Pending",
  },
  {
    status: "Accepted",
  },
  {
    status: "Rejected",
  },
];

const Booking = async () => {
  const [value, setValue] = useState([]);
  if (count == 0) {

    try {
      const driverph = await AsyncStorage.getItem('DriverPh');
      console.log(driverph);
      get(child(dbRef, `Driver Booking`)).then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            if (driverph == child.val().driverContact) {
              check.push({
                key: child.val().driverContact,
                UserName: child.val().userName,
                UserContact: child.val().userContact,
                status: child.val().status,
              })
            }
          })
          setValue(check)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    } catch (error) {
      // Error retrieving data
    }
  }
  count++;
  console.log(check);
}

const AcceptRequest = (usercontact) => {

  get(child(dbRef, `Driver Booking`)).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((child) => {
        if (usercontact == child.val().userContact) {
          const parent = child.key;
          console.log(parent);

          const UserDestinationLat = child.val().UserDestinationLat;
          const UserDestinationLng = child.val().UserDestinationLng;
          const UserStartingLat = child.val().UserStartingLat;
          const UserStartingLng = child.val().UserStartingLng;
          const driverContact = child.val().driverContact;
          const driverName = child.val().driverName;
          const userContact = child.val().userContact;
          const userName = child.val().userName;
          const status = "Accepted";

          set(ref(getDatabase(), "Driver Booking/" + parent), {
            UserDestinationLat, UserDestinationLng, UserStartingLat, UserStartingLng, driverContact, driverName, status, userContact, userName,
          })
        }
      })
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

}


const RejectRequest = (usercontact) => {

  get(child(dbRef, `Driver Booking`)).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((child) => {

        if (usercontact == child.val().userContact) {
          const parent = child.key;
          console.log(parent);

          const UserDestinationLat = child.val().UserDestinationLat;
          const UserDestinationLng = child.val().UserDestinationLng;
          const UserStartingLat = child.val().UserStartingLat;
          const UserStartingLng = child.val().UserStartingLng;
          const driverContact = child.val().driverContact;
          const driverName = child.val().driverName;
          const userContact = child.val().userContact;
          const userName = child.val().userName;
          const status = "Rejected";

          set(ref(getDatabase(), "Driver Booking/" + parent), {
            UserDestinationLat, UserDestinationLng, UserStartingLat, UserStartingLng, driverContact, driverName, status, userContact, userName,
          })

        }
      })
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

}



const userRequest = () => {
  const [status, setstatus] = useState("Pending");
  const [datalist, setDataList] = useState(check);
  Booking();

  const setStatusFilter = (status) => {
    if (status == "Accepted") {
      setDataList([...check.filter((e) => e.status === status)]);
      count = 0;
      check = [];

    } else if (status == "Pending") {
      setDataList([...check.filter((e) => e.status === status)]);
      check = [];
      count = 0;
    } else if (status == "Rejected") {
      setDataList([...check.filter((e) => e.status === status)]);
      check = [];
      count = 0;
    }
    setstatus(status);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ flex: 0.1, flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
        <View style={{ flex: 0.2 }}>
          <Image
            style={{
              width: 45,
              height: 45,
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            source={{ uri: "https://www.pngrepo.com/png/43426/180/profile.png" }}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <Text style={{ fontSize: 15 }}>You have {item.status} Request</Text>
          <Text style={{ fontSize: 13 }}>{item.UserName}</Text>
          <Text style={{ fontSize: 13 }}>{item.UserContact}</Text>
        </View>
        <View style={{
          flex: 0.3,
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            disabled={item.status == "Accepted" || item.status == "Rejected"}
            style={item.status != "Accepted" ? styles.button : styles.button1}
            onPress={() => AcceptRequest(item.UserContact)}
          >
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 m-3`}
              name='check'
              color='white'
              type='antdesign'
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={item.status == "Accepted" || item.status == "Rejected"}
            style={item.status != "Accepted" ? styles.button : styles.button1}
            onPress={() => RejectRequest(item.UserContact)}
          >
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 m-3 `}
              name='close'
              color='white'
              type='antdesign'
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TabBar}>
        {listtab.map((e) => (
          <TouchableOpacity
            style={[
              styles.buttonTab,
              status === e.status && styles.buttonTabActive,
            ]}
            onPress={() => setStatusFilter(e.status)}
          >
            <Text style={[styles.Text]}>{e.status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        style={{ top: 10, }}
        data={datalist}
        keyExtractor={(e, i) => i.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default userRequest;

const deviceWidth = Math.round(Dimensions.get("window").width);
const offset = 40;
const radius = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
    justifyContent: "center",
  },
  TabBar: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonTab: {
    width: Dimensions.get("window").width / 3.5,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "green",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
  },
  Text: {
    fontSize: 16,
    color: "#000",
  },
  buttonTabActive: {
    backgroundColor: "#b22222",
  },
  button: {
    //opacity: 0.5,
  },
  button1: {
    opacity: 0.5,
  },
});


