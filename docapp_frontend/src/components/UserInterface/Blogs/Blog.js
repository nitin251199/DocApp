import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  Dashboard,
  ExitToApp,
  FileCopy,
  LocalHospital,
  Book,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { getData, postData, postDataAndImage, ServerURL } from "../../FetchNodeServices";
import Footer from "../Footer";
import Header from "../Header";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
  },
}));

export const Blog = (props) => {
  Blog.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
      [{ color: [] }, { background: [] }],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Blog.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
  ];

  const classes = useStyles();
  const [userData, setUserData] = React.useState([]);
  const [departmentList,setDepartmentList] = useState([])
  const [blogTitle,setBlogTitle] = useState("")
  const [blogCategory,setBlogCategory] = useState("")
  const [blogMaterial,setBlogMaterial] = useState("")
  const [blogDate,setBlogDate] = useState(new Date())

  const u = JSON.parse(sessionStorage.getItem("docdetails"));

  const fetchUser = async () => {
    var body = { phoneno: u.phoneno };
    var result = await postData("doctor/checkdoctormobilenumber", body);
    setUserData(result.data[0]);
  };

  const fetchAllDepartments = async () => {
    var list = await getData("doctor/fetchalldepartments");
    setDepartmentList(list.data);
  };

  useEffect(function () {
    fetchAllDepartments();
  }, []);

const fillDepartments = () => {
    return departmentList.map((item) => {
      return (
        <MenuItem value={item.departmentname}>{item.departmentname}</MenuItem>
      );
    });
  }

  const handlePublish = async() => {
    var body = {"blogtitle":blogTitle,"blogcategory":blogCategory,"blogmaterial":blogMaterial,
    "blogwriter":userData.doctorname,"blogdate":blogDate}
    var result = await postData("doctor/addblog", body)
    if(result){
      Swal.fire({
        title: "E-Consult.com",
        text: "Your Blog has been published successfully...",
        imageUrl: "/docConsultblue.jpg",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
      })
    } else {
      Swal.fire({
        title: "E-Consult.com",
        text: "Error in publishing the blog...",
        imageUrl: "/docConsultblue.jpg",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    }
    setBlogMaterial("")
    setBlogTitle("")
    setBlogCategory("")
  }

  useEffect(function () {
    fetchUser();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 75 }}>
        <Header history={props.history} />
      </div>

      <Grid container className={classes.root}>
        <Grid
          item
          xs={12}
          style={{
            backgroundColor: "#0a3f6d",
            padding: "15px 6rem",
            color: "#fff",
            fontSize: "27px",
            fontWeight: "800",
          }}
        >
          <span>Add Blogs</span>
        </Grid>
        <Grid item xs={3} style={{ padding: 10 }}>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: 15,
              height: 170,
            }}
          >
            <Avatar
              variant="rounded"
              src={`${ServerURL}/images/${userData.picture}`}
              style={{ width: 100, height: 100, margin: 10 }}
            />
            <span style={{ fontSize: 18, letterSpacing: 1, paddingBottom: 3 }}>
              <b>{userData.doctorname}</b>
            </span>
            <span style={{ color: "gray" }}>
              <span
                style={{
                  fontSize: 14,
                  borderRight: "1px  solid black",
                  paddingInline: 5,
                }}
              >
                {userData.department != null ? userData.department : "--"}
              </span>
              <span style={{ padding: 2, paddingInline: 5 }}>
                {userData.qualification != null ? userData.qualification : "--"}
              </span>
            </span>
          </Paper>
          <Grid item xs={12} style={{ paddingTop: 10 }}>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: 15,
              height: "auto",
            }}
          >
            <ListItem
              button
              dense
              onClick={() => props.history.push("/docprofile2")}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  Dashboard
                </span>
              </ListItemText>
            </ListItem>

            <ListItem button dense>
              <ListItemIcon>
                <FileCopy />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  Reports
                </span>
              </ListItemText>
            </ListItem>

            <ListItem button dense>
              <ListItemIcon>
                <LocalHospital />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  Prescriptions
                </span>
              </ListItemText>
            </ListItem>

            <ListItem button dense onClick={() => props.history.push("/blog")}>
              <ListItemIcon>
                <Book />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>Add Blogs</span>
              </ListItemText>
            </ListItem>

            <ListItem button dense>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>Logout</span>
              </ListItemText>
            </ListItem>
          </Paper>
        </Grid>

        </Grid>
        <Grid item xs={9} style={{ padding: 10 }}>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: 15,
              height: "auto",
            }}
          >
            <Grid container spacing={3} style={{padding:35}}>
              <Grid item xs={12}>
                <TextField value={blogTitle} label="Blog Title" onChange={(e)=>setBlogTitle(e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                   value={blogCategory}
                    onChange={(e)=>setBlogCategory(e.target.value)}
                  >
                    {fillDepartments()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <ReactQuill
                 value={blogMaterial}
                  style={{height:200}}
                  modules={Blog.modules}
                  formats={Blog.formats}
                  onChange={(txt) => setBlogMaterial(txt)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button onClick={()=>handlePublish()} size="large" fullWidth  color="primary" variant="contained">
                  Publish
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
              </Grid>

      <Footer history={props.history} />
    </div>
  );
};
