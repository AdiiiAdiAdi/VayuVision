import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Play, ChevronUp, Plus, Minus } from 'lucide-react';

interface SimulationParameters {
  green: number; // green areas/parks percentage
  building: number; // building density percentage
  water: number; // water bodies percentage
  vehicles: number; // vehicle traffic percentage
  industrial: number; // industrial activity percentage
  energy: number; // energy consumption percentage
  congestion: number; // traffic congestion percentage
  publicTransport: number; // public transport availability percentage
}

interface GridCell {
  id: string;
  x: number;
  y: number;
  emission: number;
  type: 'residential' | 'industrial' | 'commercial' | 'transport';
  interventions: Array<{
    id: string;
    type: string;
    efficiency: number;
    name: string;
    icon?: string;
  }>;
  baseEmission: number;
  simulationParams?: SimulationParameters;
}

interface SimulationControlsProps {
  parameters: SimulationParameters;
  onParameterChange: (key: keyof SimulationParameters, value: number) => void;
  onRunSimulation: () => void;
  onResetSimulation: () => void;
  onSaveScenario: () => void;
  isRunning: boolean;
  currentScenario: string;
  selectedCellId?: string | null;
  selectedCell?: GridCell | null;
  onRemoveIntervention?: (interventionId: string) => void;
}

export function SimulationControls({
  parameters,
  onParameterChange,
  onRunSimulation,
  onResetSimulation,
  onSaveScenario,
  isRunning,
  currentScenario,
  selectedCellId,
  selectedCell,
  onRemoveIntervention
}: SimulationControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">Emission Factors</h3>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
        {!selectedCellId && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              🔸 Select a cell on the map to apply local simulation changes
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm mb-2">
            Green Areas: {parameters.green}%
          </label>
          <Slider
            value={[parameters.green]}
            onValueChange={(value) => onParameterChange('green', value[0])}
            max={100}
            min={0}
            step={5}
            className="w-full"
            disabled={!selectedCellId}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Building Density: {parameters.building}%
          </label>
          <Slider
            value={[parameters.building]}
            onValueChange={(value) => onParameterChange('building', value[0])}
            max={100}
            min={0}
            step={5}
            className="w-full"
            disabled={!selectedCellId}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Water Bodies: {parameters.water}%
          </label>
          <Slider
            value={[parameters.water]}
            onValueChange={(value) => onParameterChange('water', value[0])}
            max={100}
            min={0}
            step={5}
            className="w-full"
            disabled={!selectedCellId}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Vehicles: {parameters.vehicles}%
          </label>
          <Slider
            value={[parameters.vehicles]}
            onValueChange={(value) => onParameterChange('vehicles', value[0])}
            max={100}
            min={0}
            step={5}
            className="w-full"
            disabled={!selectedCellId}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Industrial Activity: {parameters.industrial}%
          </label>
          <Slider
            value={[parameters.industrial]}
            onValueChange={(value) => onParameterChange('industrial', value[0])}
            max={100}
            min={0}
            step={5}
            className="w-full"
            disabled={!selectedCellId}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Energy Consumption: {parameters.energy}%
          </label>
          <Slider
            value={[parameters.energy]}
            onValueChange={(value) => onParameterChange('energy', value[0])}
            max={100}
            min={0}
            step={5}
            className="w-full"
            disabled={!selectedCellId}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Traffic Congestion: {parameters.congestion}%
          </label>
          <Slider
            value={[parameters.congestion]}
            onValueChange={(value) => onParameterChange('congestion', value[0])}
            max={100}
            min={0}
            step={5}
            className="w-full"
            disabled={!selectedCellId}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Public Transport: {parameters.publicTransport}%
          </label>
          <Slider
            value={[parameters.publicTransport]}
            onValueChange={(value) => onParameterChange('publicTransport', value[0])}
            max={100}
            min={0}
            step={5}
            className="w-full"
            disabled={!selectedCellId}
          />
        </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
            <p className="text-blue-800">
              💡 Select a cell on the map, then adjust the sliders to see localized impact on that cell and its neighbors.
            </p>
          </div>
        </div>
      )}
    </Card>

    {/* Selected Cell Details Card */}
    {selectedCell && (
      <Card className="p-4 mt-4">
        <h3 className="text-lg mb-4">Cell Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Cell ID:</span>
            <span className="text-sm font-semibold">{selectedCell.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Zone Type:</span>
            <Badge variant="outline" className="capitalize">
              {selectedCell.type}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Base Emission:</span>
            <span className="text-sm font-semibold text-red-600">
              {selectedCell.baseEmission.toFixed(1)} tons/year
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Current Emission:</span>
            <span className={`text-sm font-semibold ${
              selectedCell.emission > 150 ? 'text-red-600' :
              selectedCell.emission > 50 ? 'text-orange-500' : 'text-green-600'
            }`}>
              {selectedCell.emission.toFixed(1)} tons/year
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Reduction:</span>
            <span className="text-sm font-semibold text-green-600">
              {((selectedCell.baseEmission - selectedCell.emission) / selectedCell.baseEmission * 100).toFixed(1)}%
            </span>
          </div>
          {selectedCell.interventions.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <div className="text-sm text-gray-600 mb-2">Active Interventions:</div>
              <div className="space-y-2">
                {selectedCell.interventions.map((intervention) => (
                  <div key={intervention.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {intervention.icon && <span>{intervention.icon}</span>}
                      <span>{intervention.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-600 font-semibold">
                        -{intervention.efficiency}%
                      </span>
                      {onRemoveIntervention && selectedCell && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                          onClick={() => onRemoveIntervention(`${selectedCell.id}-${intervention.id}`)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    )}
    </>
  );
}