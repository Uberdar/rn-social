import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
const CreateScreen = ({ navigation }) => {
  const [snap, setSnap] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();

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

      const location = await Location.getCurrentPositionAsync();
      setPhoto(takenPhoto.uri);

      console.log("latitude", location.coords.latitude);
      console.log("longitude", location.coords.longitude);
      console.log("takenPhoto: ", takenPhoto);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", { photo });
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
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
});

export default CreateScreen;
