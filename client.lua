local display = false
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(100)
        local ped = GetPlayerPed(-1)
        local veh = GetVehiclePedIsIn(ped, false)
        pauseMenuOn = IsPauseMenuActive()
        if IsPedInVehicle(ped, veh, false) and not pauseMenuOn then
            speed = GetEntitySpeed(veh) * 3.6
            gear = GetVehicleCurrentGear(veh)
            fuel = exports.frfuel:getCurrentFuelLevel()
            fuelAlert = Config.FuelAlert
            engineControl = GetIsVehicleEngineRunning(veh)
            signalLights = GetVehicleIndicatorLights(veh)
            handbrake = GetVehicleHandbrake(veh) 
            
            local vehVal, lowBeamsOn, highbeamsOn = GetVehicleLightsState(veh)
            if lowBeamsOn == 1 and highbeamsOn == 0 then
                lights = 'normal'
            elseif lowBeamsOn == 1 and highbeamsOn == 1 or lowBeamsOn == 0 and highbeamsOn == 1 then
                lights = 'high'
            else
                lights = 'off'
            end

            SendNUIMessage({ 
                display = true,
                speed = speed,
                gear = gear,
                fuel = fuel,
                fuelAlert = fuelAlert,
                lights = lights,
                signalLights = signalLights,
                handbrake = handbrake,
                engineControl = engineControl,
                pauseMenuOn = pauseMenuOn
            })
        else
            SendNUIMessage({ 
				display = false,
            })
            Citizen.Wait(500)
        end
    end
end)