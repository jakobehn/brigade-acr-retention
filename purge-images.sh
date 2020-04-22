#Login using supplied SP and select the subscription
az login --service-principal --username $spUserName --password $spPassword --tenant $spTenantId
az account set --subscription "$subscriptionName"

# Get all the tags from the supplied repository
TAGS=($(az acr repository show-tags --name $registryName --repository $repositoryName  --output tsv --orderby time_desc))
total=${#TAGS[*]}

for (( i=$minImagesToKeep; i<=$(( $total -1 )); i++ ))
do 
     imageName="$repositoryName:${TAGS[$i]}"
     echo "Deleting image: $imageName"
     az acr repository delete --name $registryName --image $imageName --yes 
done

echo "Retention done"