const { events, Job, Group } = require("brigadier");

events.on("image_push", async (e, p) => {
    
    var purgeStep = new Job("purge", "mcr.microsoft.com/azure-cli")
    purgeStep.env = {
        subscriptionName: p.secrets.subscriptionName,
        registryName: p.secrets.registryName,
        repositoryName: p.secrets.repositoryName,
        minImagesToKeep: p.secrets.minImagesToKeep,
        spUserName: p.secrets.spUserName,
        spPassword: p.secrets.spPassword,
        spTenantId: p.secrets.spTenantId
    }
    purgeStep.tasks = [
        "cd src",
        "bash purge-images.sh",
      ];      
    purgeStep.run();    

  });
