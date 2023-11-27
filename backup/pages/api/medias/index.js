import { executeQuery } from "../../../conn/conn";
import catchError from "../../../middelware/catchError";
import { formatDate, token, verifyToken } from "../../../middelware/token";
export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "POST":
      await verifyToken(req, res);
      await addMedia(req, res);
      break;
    case "GET":
      await verifyToken(req, res);
      await allMedia(req, res);
      break;
    case "PATCH":
      await subcategoryis(req, res);
      break;
    case "PUT":
      await verifyToken(req, res);
      await updateMedia(req, res);
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const addMedia = catchError(async (req, res) => {
  const databse = req.id.code;
  const userId = req.id.userid;
  if (databse) {
    const { value } = req.body;
    if (value) {
      const {
        name,
        total,
        mediaPrice,
        city,
        district,
        ftf,
        height,
        width,
        location,
        category,
        subcategory,
        illumination,
        measuring,
        geo_location,
        available_date,
      } = value;
      const data = await executeQuery(
        "SELECT id FROM tblmedia_deails WHERE medianame = '" + name + "'",
        `odoads_${databse}`
      );
      if (data.length == 1) {
        return res.status(206).json({ message: "MediaName already Exists" });
      } else {
        let $tblnm;
        let mediaImage = "dasjdshavhja";
        switch (category) {
          case "Mall Media":
            $tblnm = 3;
            break;
          case "Traditional OOH Media":
            $tblnm = 20;
            break;
          case "Digital OOH":
            $tblnm = 100;
            break;
          case "Airpot Media":
            $tblnm = 104;
            break;
          case "Offices":
            $tblnm = 105;
            break;
          case "In Flight Media":
            $tblnm = 106;
            break;
          case "Transit Media":
            $tblnm = 107;
            break;
        }

        const result = await executeQuery(
          "SELECT id, name FROM tblmedia_categories WHERE name='" +
            subcategory +
            "' UNION ALL SELECT id, state_id FROM tblcities WHERE name='" +
            city +
            "'",
          "odoads_general_tbl"
        );
        if (result) {
          const Subcategory_id = result[0].id;
          let state = result[1].name;
          let cityid = result[1].id;
          const lh =
            "SELECT code  FROM tblmedia_deails WHERE code LIKE '%GOH" +
            $tblnm +
            category[0] +
            "%'  ORDER BY ID DESC LIMIT 1";
          const lastdata = await executeQuery(lh, `odoads_${databse}`);
          let Mediacode = "";
          if (lastdata.length == 1) {
            const splits = lastdata[0].code.split(category[0]);
            const increaseID = parseInt(splits[1]) + 1;
            Mediacode = `GOH${$tblnm + category[0] + increaseID}`;
          } else {
            Mediacode = `GOH${$tblnm + category[0] + 1}`;
          }
          const availabledate = formatDate(available_date); // category_id,    sub_category_id, medianame, totalno,         code,          price,          pricetype, thumbnail,    state,     city,       district,    width,      widthunit,    height, heightunit,     illumination,      ftf,  areadescription,       location,     geolocation, allocate_start_date,allocate_end_date,available_date,syncstatus
          const ann =
            "INSERT INTO tblmedia_deails (category_id, sub_category_id, medianame, totalno, code, price, pricetype, thumbnail, state, city, district, width,widthunit, height, heightunit, illumination, ftf, areadescription, location, geolocation,  available_date,syncstatus, created_date, owner) VALUES ('" +
            $tblnm +
            "'," +
            Subcategory_id +
            ", '" +
            name +
            "', " +
            total +
            ", '" +
            Mediacode +
            "', " +
            mediaPrice +
            ", 'Month', '" +
            mediaImage +
            "'," +
            state +
            "," +
            cityid +
            ", '" +
            district +
            "'," +
            width +
            ",'" +
            measuring +
            "', " +
            height +
            ",'" +
            measuring +
            "', '" +
            illumination +
            "','" +
            ftf +
            "','" +
            location +
            "','" +
            location +
            "', '" +
            geo_location +
            "','" +
            availabledate +
            "','added', CURRENT_TIMESTAMP," +
            userId +
            " )";

          const data = await executeQuery(ann, `odoads_${databse}`);
          if (data) {
            return res.status(200).json({ message: "Success" });
          } else {
            return res.status(206).json("Try agin");
          }
        }
      }
    } else {
      return res.status(206).json({ message: "Empty Fields" });
    }
  }
});

export const allMedia = catchError(async (req, res) => {
  const databse = req.id.code;
  const data = await executeQuery(
    "SELECT media.id,media.medianame,media.totalno,media.illumination,media.code,media.price,media.pricetype,media.thumbnail, media.district, media.width, media.widthunit, media.height, media.heightunit, media.foot_fall, media.ftf, media.areadescription, media.location, media.geolocation, media.allocate_start_date,media.allocate_end_date,media.available_date, subcategory.name as subcategory, cities.name as city, state.name as state, CASE WHEN media.category_id  = 3 THEN 'Mall Media' WHEN media.category_id  = 20 THEN 'Traditional OOH Media'  WHEN media.category_id  = 100 THEN 'Digital OOH'  WHEN media.category_id  = 104 THEN 'Airpot Media' WHEN media.category_id  = 105 THEN 'Offices Media' WHEN media.category_id  = 106 THEN 'In Flight Media' ELSE 'Transit Media' END as category, media.isBooked as booked, media.isBlocked as block  FROM tblmedia_deails as media INNER JOIN odoads_general_tbl.tblmedia_categories as subcategory ON subcategory.id = media.sub_category_id INNER JOIN odoads_general_tbl.tblcities as cities ON cities.id = media.city INNER JOIN odoads_general_tbl.tblstates as state ON state.id = media.state WHERE media.isDelete = 0",
    `odoads_${databse}`
  );
  return res.send(data);
});

export const updateMedia = catchError(async (req, res) => {
  const code = req.id.code;
  if (code) {
    const { state } = req.body;
    if (state) {
      const {
        id,
        medianame,
        totalno,
        price,
        city,
        district,
        ftf,
        height,
        width,
        location,
        category,
        subcategory,
        illumination,
        thumbnail,
        heightunit,
        geolocation,
        available_date,
      } = state;

      const getOldData = await executeQuery(
        "SELECT category_id  FROM  tblmedia_deails WHERE id = " + id + "",
        `odoads_${code}`
      );
      let $tblnm;
      let updateCtegoryfield = "";
      switch (category) {
        case "Mall Media":
          $tblnm = 3;
          break;
        case "Traditional OOH Media":
          $tblnm = 20;
          break;
        case "Digital OOH":
          $tblnm = 100;
          break;
        case "Airpot Media":
          $tblnm = 104;
          break;
        case "Offices":
          $tblnm = 105;
          break;
        case "In Flight Media":
          $tblnm = 106;
          break;
        case "Transit Media":
          $tblnm = 107;
          break;
      }
      if ($tblnm !== getOldData[0].category_id) {
        const lh =
          "SELECT code  FROM tblmedia_deails WHERE code LIKE '%GOH" +
          $tblnm +
          category[0] +
          "%'  ORDER BY ID DESC LIMIT 1";
        const lastdata = await executeQuery(lh, `odoads_${code}`);
        let Mediacode = "";
        if (lastdata.length == 1) {
          const splits = lastdata[0].code.split(category[0]);
          const increaseID = parseInt(splits[1]) + 1;
          Mediacode = `GOH${$tblnm + category[0] + increaseID}`;
        } else {
          Mediacode = `GOH${$tblnm + category[0] + 1}`;
        }
        updateCtegoryfield =
          "category_id = " + $tblnm + ", code = '" + Mediacode + "' ,";
      }

      const result = await executeQuery(
        "SELECT id, name FROM tblmedia_categories WHERE name='" +
          subcategory +
          "' UNION  SELECT id, state_id FROM tblcities WHERE name='" +
          city +
          "'",
        "odoads_general_tbl"
      );
      if (result) {
        const Subcategory_id = result[0].id;
        const cityid = result[1].id;
        const state = result[1].name;

        const newMedia =
          "UPDATE tblmedia_deails SET totalno = " +
          totalno +
          ",sub_category_id = " +
          Subcategory_id +
          ", medianame =  '" +
          medianame +
          "', " +
          updateCtegoryfield +
          " price =  " +
          price +
          ",  thumbnail = '" +
          thumbnail +
          "', state = " +
          state +
          ", city = " +
          cityid +
          ", district = '" +
          district +
          "', width = " +
          width +
          ",widthunit = '" +
          heightunit +
          "', height =  " +
          height +
          ", heightunit = '" +
          heightunit +
          "', illumination =  '" +
          illumination +
          "', ftf = '" +
          ftf +
          "', areadescription = '" +
          location +
          "', location = '" +
          location +
          "', geolocation =  '" +
          geolocation +
          "',  available_date = '" +
          available_date +
          "',syncstatus = 'added', modify_date = CURRENT_TIMESTAMP WHERE id = " +
          id +
          "";
        const data = await executeQuery(newMedia, `odoads_${code}`);

        if (data) {
          return res.status(200).json("Media Updated Successfully");
        } else {
          return res.status(206).json("Something Wrong Here");
        }
      } else {
        return res.status(206).json({ message: "Empty Fields" });
      } // category_id, sub_category_id,    medianame,  totalno,            code,       price,          pricetype,        thumbnail,       state,     city,       district,    width,    widthunit,    height,   heightunit, foot_fall,    illumination,      ftf,      areadescription,       location,     geolocation, allocate_start_date,allocate_end_date,available_date,syncstatus
    }
  }
});

export const subcategoryis = catchError(async (req, res) => {
  const { media } = req.body;
  let $tblnm;
  switch (media) {
    case "Mall Media":
      $tblnm = 3;
      break;
    case "Traditional OOH Media":
      $tblnm = 20;
      break;
    case "Digital OOH":
      $tblnm = 100;
      break;
    case "Airpot Media":
      $tblnm = 104;
      break;
    case "Offices":
      $tblnm = 105;
      break;
    case "In Flight Media":
      $tblnm = 106;
      break;
    case "Transit Media":
      $tblnm = 107;
      break;
  }
  const subCate = await executeQuery(
    "SELECT name  from tblmedia_categories WHERE p_id = " + $tblnm + "",
    "odoads_general_tbl"
  );
  if (subCate) {
    return res.status(200).json(subCate);
  }
});
