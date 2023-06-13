import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as addressService from "./services/addressService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const deleteAddress = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[2];
  await addressService.deleteById(id);

  return redirectTo("/");
};

const addMessage = async (request) => {
  const formData = await request.formData();

  const sender = formData.get("sender");
  const message = formData.get("message");

  await addressService.create(sender, message);

  return redirectTo("/");
};

const listAddresses = async (request) => {
  const data = {
    addresses: await addressService.findAll(),
  };

  return new Response(await renderFile("index.eta", data), responseDetails);
};

const listLatestMessages = async (request) => {
    const data = {
      messages: await addressService.recent(),
    };
    console.log(data.messages);
    console.log("listLatestMessages");

    return new Response(await renderFile("index.eta", data), responseDetails);
  };

const handleRequest = async (request) => {
  const url = new URL(request.url);
  
  if (request.method === "POST") {
    return await addMessage(request);
  } else if (request.method === "GET" && url.pathname === "/") {
    return await listLatestMessages(request);
  }

  return redirectTo("/");
};

serve(handleRequest, { port: 7777 });