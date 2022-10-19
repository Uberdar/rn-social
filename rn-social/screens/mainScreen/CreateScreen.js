import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import db from "../../firebase/config";
const CreateScreen = ({ navigation }) => {
  const [snap, setSnap] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();
  const [comment, setComment] = useState();
  const [location, setLocation] = useState(null);

  const { userId, nickname } = useSelector((state) => state.auth);
  console.log("userId: ", userId);
  console.log("nickname: ", nickname);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const takePhoto = async () => {
    try {
      if (!snap) {
        console.log("snap: ", snap);
        return;
      }
      const { status } = await Camera.getCameraPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access camera was denied");
        return;
      }
      const takenPhoto = await snap.takePictureAsync();

      setPhoto(takenPhoto.uri);

      // console.log("latitude", location.coords.latitude);
      // console.log("longitude", location.coords.longitude);
      // console.log("takenPhoto: ", takenPhoto);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await db
      .firestore()
      .collection("posts")
      .add({ photo, comment, location: location.coords, userId, nickname });
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const data = await db.storage().ref(`postImage/${uniquePostId}`).put(file);
    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();
    return processedPhoto;
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          style={styles.camera}
          onCameraReady={onCameraReady}
          ref={setSnap}
        >
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: 200, width: 200 }}
              />
            </View>
          )}
          <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
            <Text style={styles.snap}>SNAP</Text>
          </TouchableOpacity>
        </Camera>
      )}
      <View style={styles.inputPhotoContainer}>
        <TextInput style={styles.inputPhotoText} onChangeText={setComment} />
      </View>
      <View>
        <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
          <Text style={styles.sendLabel}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "70%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  snap: {
    color: "#fff",
  },
  snapContainer: {
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
  inputPhotoContainer: { marginHorizontal: 10 },
  inputPhotoText: {
    height: 50,
    borderWidth: 1,
    borderColor: "#fff",
    borderBottomColor: "#20b2aa",
  },
});

export default CreateScreen;
