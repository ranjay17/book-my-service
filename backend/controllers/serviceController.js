import Service from "../models/serviceModel.js";

export const createService = async(req,res) =>{
    try {
        if(req.user.role !== "vendor"){
            return res
              .status(400)
              .json({ message: "Only vendors can create services"});
        }
        const{title, description, price, image, category, location} = req.body;
        if(!title || !description || !price || !image || !location || !category){
            return res.status(400).json({message: "All fields are required"})
        }
        const newService = new Service({
          title,
          description,
          price,
          image,
          category,
          location,
          vendorId: req.user.id,
        });
        await newService.save();
        res.status(200).json({message: "New service created", newService})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getAllServices = async(req,res) =>{
    try {
        const services = await Service.find().populate("vendorId", "name");
        return res.status(200).json({services})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getParticularService = async(req,res) =>{
    try {
        const{id} = req.params;
        const particularService = await Service.findById(id);
        if (!particularService) {
          return res.status(404).json({
            message: "Service not found",
          });
        }
        return res.status(200).json({particularService})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateService = async(req,res) =>{
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) {
          return res.status(404).json({
            message: "Service not found",
          });
        }
        if (service.vendorId.toString() !== req.user.id) {
          return res.status(403).json({
            message: "You are not authorized to update this service",
          });
        }
        
        const updatedService = await Service.findByIdAndUpdate(id, req.body, {new: true})
        if (!updatedService) {
          return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({
          message: "Service updated successfully",
          updatedService,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteService = async(req,res) =>{
    try {
        const{id} = req.params;
        const service = await Service.findById(id);
        if(!service){
            return res.status(400).json({
              message: "Service not found",
            });
        }
        if(service.vendorId.toString() !== req.user.id){
            return res.status(403).json({
              message: "You are not authorized to delete this service",
            });
        }
        await Service.findByIdAndDelete(id)
        res.status(200).json({
          message: "Service deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}