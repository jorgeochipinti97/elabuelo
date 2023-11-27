import { useForm, useFieldArray } from "react-hook-form";

import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import axios from "axios";
import { formattwo } from "../utils/currency";

// Define el esquema de validación con Yup aquí...

export const ProductForm = ({ product, isUpdating }) => {
  const [talles, setTalles] = useState([
    {
      nombre: "Queen",
      stock:
        product &&
        product.talles &&
        product.talles.find((t) => t.nombre === "Queen")
          ? product.talles.find((t) => t.nombre === "Queen").stock
          : 0,
    },
    {
      nombre: "King",
      stock:
        product &&
        product.talles &&
        product.talles.find((t) => t.nombre === "King")
          ? product.talles.find((t) => t.nombre === "King").stock
          : 0,
    },
    {
      nombre: "1-plaza",
      stock:
        product &&
        product.talles &&
        product.talles.find((t) => t.nombre === "1-plaza")
          ? product.talles.find((t) => t.nombre === "1-plaza").stock
          : 0,
    },
    {
      nombre: "2-plazas",
      stock:
        product &&
        product.talles &&
        product.talles.find((t) => t.nombre === "2-plazas")
          ? product.talles.find((t) => t.nombre === "2-plazas").stock
          : 0,
    },
  ]);

  useEffect(() => {
    if (product && product.talles) {
      setTalles(
        product.talles.map((talle) => ({
          nombre: talle.nombre,
          stock: talle.stock || 0,
        }))
      );
    }
    console.log(product);
  }, [product]);
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titulo: product?.titulo || "",
      descripcion: product?.descripcion || "",
      price: product?.precio || "",
      categoria: product?.categoria || "",
      subcategoria:product?.subcategoria ||"",
      tags: product?.tags || [],
      descuento: product ? product.descuento : 0,
    },
  });
  useEffect(() => {
    if (isUpdating && product) {
      setValue("titulo", product.titulo);
      setValue("descripcion", product.descripcion);
      setValue("price", product.precio);
      setValue("categoria", product.categoria);
      setValue("subcategoria", product.subcategoria);
      setValue("tags", product.tags);
      setValue("descuento", product.descuento);
    }
  }, [isUpdating, product, setValue]);

  const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "AVIF", "WEBP"];

  const [imagesArray, setImagesArray] = useState(product?.images || []);

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  useEffect(() => {
    // Esto es para reiniciar los valores del formulario con los del producto cuando el producto cambie.
    reset({
      titulo: product?.titulo || "",
      descripcion: product?.descripcion || "",
      price: product?.precio || "",
      categoria: product?.categoria || "",

      tags: product?.tags || [],
    });
    setImagesArray(product?.images || []);
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      const newSlug =
        data.titulo
          .trim()
          .replaceAll(" ", "_")
          .replaceAll("'", "")
          .replaceAll("/", "")
          .replaceAll("|", "")
          .replaceAll("@", "")
          .replaceAll("`", "")
          .replaceAll(".", "")
          .replaceAll(",", "")
          .replaceAll("[", "")
          .replaceAll("]", "")
          .replaceAll("&", "")
          .toLocaleLowerCase() || "";

      const productDataNew = {
        titulo: data.titulo,
        tags: data.tags,
        images: imagesArray,
        talles: talles,
        slug: newSlug,
        precio: parseFloat(data.price),
        categoria: data.categoria,
        subcategoria:data.subcategoria,
        descripcion: data.descripcion,
        descuento: data.descuento,
      };
      const productDataUpdate = product && {
        _id: product._id,
        titulo: data.titulo,
        tags: data.tags,
        images: imagesArray,
        talles: talles,
        slug: newSlug,
        precio: parseFloat(data.price),
        categoria: data.categoria,
        subcategoria:data.subcategoria,
        descripcion: data.descripcion,
        descuento: parseFloat(data.descuento),
      };

      const response = await axios({
        method: isUpdating ? "put" : "post",
        url: "/api/product",
        data: isUpdating ? productDataUpdate : productDataNew,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTalleChange = (index, field, value) => {
    const updatedTalles = talles.map((talle, i) =>
      i === index ? { ...talle, [field]: value } : talle
    );

    if (field === "stock" && (isNaN(value) || parseInt(value) < 0)) {
      return;
    }

    setTalles(updatedTalles);
  };

  const handleFileChange = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dyjv8k20k/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImagesArray(imagesArray.concat(data.secure_url));
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <>
      <FileUploader
        handleChange={handleFileChange}
        name="file"
        types={fileTypes}
        maxSize={4}
      />
      <button type="submit">Subir Imagen</button>

      <div className="flex">
        {imagesArray.map((e) => (
          <div key={e}>
            <img src={e} alt="" width={200} height={200} loading="lazy" />
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-white">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Título:
          </label>
          <input
            id="titulo"
            {...register("titulo", { required: true })}
            defaultValue={product?.titulo} // Se agrega defaultValue para cargar el valor actual
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Descripcion:
          </label>
          <input
            id="descripcion"
            {...register("descripcion", { required: true })}
            defaultValue={product?.descripcion} // Se agrega defaultValue para cargar el valor actual
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Precio - {formattwo(getValues("price"))}
          </label>
          <input
            id="price"
            {...register("price", { required: true })}
            defaultValue={product?.precio} // Se agrega defaultValue para cargar el valor actual
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {tagFields.map((field, index) => (
          <div key={field.id} className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Tag {index + 1}:
            </label>
            <input
              {...register(`tags.${index}`)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              className="bg-black"
              onClick={() => removeTag(index)}
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-black px-4 py-2 rounded-lg mb-5"
          onClick={() => appendTag("")}
        >
          Añadir Tag
        </button>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Categoría:
          </label>
          <select
            id="categoria"
            {...register("categoria", { required: true })}
            defaultValue={product?.categoria} // Se agrega defaultValue para cargar el valor actual
            className="block appearance-none w-full bg-white border border-gray-400 text-black hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona una categoría...</option>
            <option value="combo">Combo</option>
            <option value="sommiers">Sommiers</option>
            <option value="colchones">Colchones</option>
            <option value="respaldos">Respaldos</option>
            <option value="almohadas">Almohadas</option>
            <option value="sillones">Sillones</option>
            <option value="box">Box</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
Subcategoria
          </label>
          <select
            id="categoria"
            {...register("subcategoria", { required: true })}
            defaultValue={product?.subcategoria} // Se agrega defaultValue para cargar el valor actual
            className="block appearance-none w-full bg-white border border-gray-400 text-black hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona una categoría...</option>
            <option value="resorte">resorte</option>
            <option value="espuma">espuma</option>

          </select>
        </div>

        <div
          className="mt-10"
          style={{ display: isUpdating ? "auto" : "none" }}
        >
          <p className="text-slate-800">Tamaños:</p>
          {product?.talles?.map((talle, index) => (
            <div key={talle.nombre} className="my-2">
              <label className="text-black mx-2">{talle.nombre}</label>
              <input
                type="number"
                defaultValue={talle.stock} // Se agrega defaultValue para cargar el valor actual
                onChange={(e) =>
                  handleTalleChange(index, "stock", parseInt(e.target.value))
                }
                className="text-black px-1 border-2 rounded-xl"
                placeholder={`Stock`}
              />
            </div>
          ))}
        </div>
        <div
          className="mt-10"
          style={{ display: isUpdating ? "none" : "auto" }}
        >
          {talles.map((talle, index) => (
            <div key={talle.nombre} className="my-2">
              <label className="text-black mx-2">{talle.nombre}</label>
              <input
                type="number"
                defaultValue={talle.stock} // Se agrega defaultValue para cargar el valor actual
                onChange={(e) =>
                  handleTalleChange(index, "stock", parseInt(e.target.value))
                }
                className="text-black px-1 border-2 rounded-xl"
                placeholder={`Stock`}
              />
            </div>
          ))}
        </div>
        <div className="mt-10">

          <label className="text-slate-800 ">Descuento %</label>
          <input
            id="descuento"
            {...register("descuento")}
            defaultValue={product?.descuento} // Se agrega defaultValue para cargar el valor actual
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            {isUpdating ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </>
  );
};
